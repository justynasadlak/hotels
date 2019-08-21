import { Component, OnInit } from '@angular/core';
import { Store } from '../../../../store';
import { Observable } from 'rxjs';
import { Booking } from '../../../resources/models/booking';
import { BookingService } from '../../../services/booking.service';
import { take, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { MainPageFacade } from '../../main-page/+state/main-page.facade';
import { UserFacade } from '../../../+state/user/user.facade';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  userBookings: Booking[];
  private username;

  constructor(
    private store: Store,
    private bookingService: BookingService,
    private mainPageFacade: MainPageFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.getUserBookings();
  }

  formatDate(input): string {
    return moment(input).format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  private getUserBookings(): void {
    this.userFacade.username$
      .pipe(
        tap(user => (this.username = user)),
        tap(() =>
          this.mainPageFacade.bookings$.subscribe(
            booking => (this.userBookings = booking.filter(b => b.user === this.username))
          )
        )
      )
      .subscribe();
  }
}
