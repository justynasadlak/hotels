import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HotelService } from '../../../services/hotel.service';
import { fromMainPageActions } from './main-page.actions';
import { map, switchMap } from 'rxjs/operators';
import { BookingService } from '../../../services/booking.service';

@Injectable()
export class MainPageEffects {
  @Effect()
  getHotels$ = this.actions$.pipe(
    ofType(fromMainPageActions.Types.GetHotels),
    switchMap(() => {
      return this.hotelService
        .getAllHotels()
        .pipe(map(hotel => new fromMainPageActions.GetHotelsSuccess(hotel)));
    })
  );

  @Effect()
  getBookings$ = this.actions$.pipe(
    ofType(fromMainPageActions.Types.GetBookings),
    switchMap(() => {
      return this.bookingService
        .getAllBookings()
        .pipe(map(booking => new fromMainPageActions.GetBookingsSuccess(booking)));
    })
  );

  constructor(
    private actions$: Actions,
    private hotelService: HotelService,
    private bookingService: BookingService
  ) {}
}
