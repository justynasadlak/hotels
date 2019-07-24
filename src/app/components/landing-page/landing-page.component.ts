import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Hotel} from '../../resources/models/hotel';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {distinct, filter, map, startWith, tap, toArray} from 'rxjs/operators';
import {Room} from '../../resources/models/room';
import {Store} from '../../../store';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  hotels$: Observable<Hotel[]>;

  searchForm: FormGroup;
  hotels: Hotel[];
  searchedHotels: Hotel[];
  hotelsToShow: Hotel[];

  cities = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  rooms: Room[];

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router, private store: Store) {
  }

  ngOnInit() {
  this.bookingService.getAllHotels().subscribe();
  this.hotels$ = this.store.select<Hotel[]>('hotels');

    this.getHotels();
    this.getRooms();
    this.searchForm = this.formBuilder.group({
      cities: [''],
      hotel: [''],
      guests: [''],
      checkIn: [''],
      duration: ['']
    });
  }

  onSubmit() {
    // console.log(this.searchForm.value);
    this.hotelsToShow = this.searchedHotels;
  }

  getRooms() {
    this.bookingService.getAllRooms().subscribe(rooms => this.rooms = rooms);
  }

  getHotels() {
    // this.bookingService.getAllHotels().subscribe(data => {
    this.hotels$.subscribe(data => {
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
