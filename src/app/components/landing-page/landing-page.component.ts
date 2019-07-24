import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Hotel} from '../../resources/models/hotel';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {distinct, filter, map, startWith, tap, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  searchForm: FormGroup;
  hotels: Hotel[];
  searchedHotels: Hotel[];
  hotelsToShow: Hotel[];

  cities = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.bookingService.getAllHotels().subscribe(data => {
      this.hotels = data;

      console.log(this.hotels);

      from(this.hotels)
        .pipe(
          map(a => a.location),
          distinct(),
          toArray()
        )
        .subscribe(val => {
          this.options = val;
          this.filterOptions();
        });
    });

    this.searchForm = this.formBuilder.group({
      cities: [''],
      hotel: [''],
      checkIn: [''],
      duration: ['']
    });
  }

  onSubmit() {
    console.log(this.searchForm.value);
    this.hotelsToShow = this.searchedHotels;
  }

  getHotelsFromSelectCity(city: string) {
    console.log(city);
    from(this.hotels)
      .pipe(
        filter(hotels => hotels.location.includes(city)
        ),
        toArray()
      )
      .subscribe(val => {
        this.searchedHotels = val;
        console.log(this.searchedHotels);
      });
  }

  filterOptions() {
    this.filteredOptions = this.cities.valueChanges.pipe(
      tap(x => this.getHotelsFromSelectCity(x)),
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
