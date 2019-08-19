import { Action } from '@ngrx/store';
import { Hotel } from '../../../resources/models/hotel';

export namespace fromMainPageActions {
  export enum Types {
    GetHotels = '[Main Page] Get Hotels',
    GetHotelsSuccess = '[Main Page] Get Hotels Success',
    GetHotelsFail = '[Main Page] Get Hotels Fail'
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

  export type CollectiveType = GetHotels | GetHotelsSuccess | GetHotelsFail;
}
