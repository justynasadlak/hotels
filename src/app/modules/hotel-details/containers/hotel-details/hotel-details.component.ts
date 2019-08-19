import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../../../store';
import { HotelService } from '../../../../services/hotel.service';
import { BookingService } from '../../../../services/booking.service';
import { Booking } from '../../../../resources/models/booking';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Facility } from '../../../../resources/models/facility';
import { Room } from '../../../../resources/models/room';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  id: string;
  name: string;
  location: string;
  facilities: Facility[];
  rooms: Room[];
  isDisabled = false;

  private bookingData: Booking;
  private startDate: string;
  private endDate: string;
  private username: string;
  private roomsToBook: Room[] = [];
  private successBooking: Booking;

  public constructor(
    private route: ActivatedRoute,
    private store: Store,
    private hotelService: HotelService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.name = params.name;
      this.location = params.location;
      this.facilities = JSON.parse(params.facilities);
      this.rooms = JSON.parse(params.rooms);
    });
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

      this.bookingService.addBooking(this.bookingData).subscribe(
        val => {
          // this.progressBar = false;
          this.successBooking = val;
          this.router.navigate(['my-profile']);
        },
        error1 => {
          alert(error1);
          this.isDisabled = false;
        }
      );
    });
    return of(this.successBooking);
  }

  private getStartDate(): void {
    this.store
      .select('startDate')
      .pipe(tap(date => (this.startDate = date.toString())))
      .subscribe();
  }

  private getEndDate(): void {
    this.store
      .select('endDate')
      .pipe(tap(date => (this.endDate = date.toString())))
      .subscribe();
  }

  private getUsername(): void {
    this.store
      .select('username')
      .pipe(tap(user => (this.username = user.toString())))
      .subscribe();
  }
}
