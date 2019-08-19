import { Action } from '@ngrx/store';
import { Hotel } from '../../../resources/models/hotel';
import { Booking } from '../../../resources/models/booking';

export namespace fromMainPageActions {
  export enum Types {
    GetHotels = '[Main Page] Get Hotels',
    GetHotelsSuccess = '[Main Page] Get Hotels Success',
    GetHotelsFail = '[Main Page] Get Hotels Fail',

    GetBookings = '[Main Page] Get Bookings',
    GetBookingsSuccess = '[Main Page] Get Bookings Success',
    GetBookingsFail = '[Main Page] Get Bookings Fail'
  }

  export class GetHotels implements Action {
    readonly type = Types.GetHotels;
  }

  export class GetHotelsSuccess implements Action {
    readonly type = Types.GetHotelsSuccess;

    constructor(public payload: Hotel[]) {}
  }

  export class GetHotelsFail implements Action {
    readonly type = Types.GetHotelsFail;
  }

  export class GetBookings implements Action {
    readonly type = Types.GetBookings;
  }

  export class GetBookingsSuccess implements Action {
    readonly type = Types.GetBookingsSuccess;

    constructor(public payload: Booking[]) {}
  }

  export class GetBookingsFail implements Action {
    readonly type = Types.GetBookingsFail;
  }

  export type CollectiveType =
    | GetHotels
    | GetHotelsSuccess
    | GetHotelsFail
    | GetBookings
    | GetBookingsSuccess
    | GetBookingsFail;
}
