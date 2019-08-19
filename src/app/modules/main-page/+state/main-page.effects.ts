import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HotelService } from '../../../services/hotel.service';
import { fromMainPageActions } from './main-page.actions';
import { map, switchMap } from 'rxjs/operators';

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

  constructor(private actions$: Actions, private hotelService: HotelService) {}
}
