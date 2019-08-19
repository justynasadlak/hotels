import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../store';
import { Observable } from 'rxjs';
import { Booking } from '../../../resources/models/booking';
import { BookingService } from '../../../services/booking.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  private bookings$: Observable<Booking[]>;
  private username;
  userBookings: Booking[];

  constructor(private store: Store, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getUserBookings();
  }

  formatDate(input): string {
    return moment(input).format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  private getUserBookings(): void {
    this.bookingService.getAllBookings().subscribe(bookings => {
      this.bookings$ = this.store.select('bookings');
      this.store
        .select('username')
        .pipe(
          tap(user => (this.username = user)),
          tap(x =>
            this.bookings$.subscribe(
              b => (this.userBookings = b.filter(booking => booking.user === this.username))
            )
          )
        )
        .subscribe();
    });
  }
}
