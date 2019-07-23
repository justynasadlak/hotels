import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Hotel} from '../../resources/models/hotel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  searchForm: FormGroup;
  hotels: Hotel[];

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.bookingService.getAllHotels().subscribe(data => this.hotels = data);

    this.searchForm = this.formBuilder.group({
      city: [''],
      hotel: [''],
      checkIn: [''],
      duration: ['']
    });
  }

  onSubmit() {
    console.log(this.searchForm.value);
    this.router.navigate(['booking']);

  }
}
