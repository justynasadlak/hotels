import { Hotel } from '../../../resources/models/hotel';
import { fromMainPageActions } from './main-page.actions';
import { Booking } from '../../../resources/models/booking';

export const MAIN_PAGE_FEATURE_KEY = 'main-page';

export interface MainPagePartialState {
  readonly [MAIN_PAGE_FEATURE_KEY]: MainPageState;
}

export interface MainPageState {
  hotels: Hotel[];
  bookings: Booking[];
}

export const initialState: MainPageState = {
  hotels: [],
  bookings: []
};

export function mainPageReducer(
  state: MainPageState = initialState,
  action: fromMainPageActions.CollectiveType
) {
  switch (action.type) {
    case fromMainPageActions.Types.GetHotels:
      state = { ...state, hotels: [] };
      break;
    case fromMainPageActions.Types.GetHotelsSuccess:
      state = { ...state, hotels: action.payload };
      break;
    case fromMainPageActions.Types.GetBookings:
      state = { ...state, bookings: [] };
      break;
    case fromMainPageActions.Types.GetBookingsSuccess:
      state = { ...state, bookings: action.payload };
      break;
  }
  return state;
}
