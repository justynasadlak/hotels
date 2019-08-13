import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Store} from '../../../store';
import {HotelService} from '../../services/hotel.service';
import {BookingService} from '../../services/booking.service';
import {Booking} from '../../resources/models/booking';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  id: string;
  name: string;
  location: string;
  facilities;
  rooms;
  isDisabled = false;

  private bookingData: Booking;
  private startDate;
  private endDate;
  private username;
  private roomsToBook = [];
  private successBooking: Booking;

  public constructor(private route: ActivatedRoute,
                     private _location: Location,
                     private store: Store,
                     private hotelService: HotelService,
                     private bookingService: BookingService,
                     private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.name = params.name;
      this.location = params.location;
      this.facilities = JSON.parse(params.facilities);
      this.rooms = JSON.parse(params.rooms);
    });
  }

  ngOnInit(): void {
    console.log(this.rooms);
  }

  onBack(): void {
    this._location.back();
  }

  onBook(roomId: string): Observable<Booking> {
    this.isDisabled = true;
    this.hotelService.getRoom(roomId).subscribe(room => {
      this.roomsToBook.push(room);
      this.getStartDate();
      this.getEndDate();
      this.getUsername();
      this.bookingData = {
        user: this.username,
        startDate: this.startDate,
        endDate: this.endDate,
        rooms: this.roomsToBook
      };
      console.log(this.bookingData);
      this.bookingService.addBooking(this.bookingData).subscribe(val => {
          // this.progressBar = false;
        this.successBooking = val;
          this.router.navigate(['my-profile']);
        },
        error1 => {
          alert(error1);
          this.isDisabled = false;
        });

    });
    return of(this.successBooking);
  }

  private getStartDate(): void {
    this.store.select('startDate').pipe(tap(date =>
      this.startDate = date)).subscribe();
  }

  private getEndDate(): void {
    this.store.select('endDate').pipe(tap(date => this.endDate = date)).subscribe();
  }

  getUsername(): void {
    this.store.select('username').pipe(tap(user => this.username = user)).subscribe();
  }
}
