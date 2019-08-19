import { Hotel } from '../../../resources/models/hotel';
import { fromMainPageActions } from './main-page.actions';

export const MAIN_PAGE_FEATURE_KEY = 'main-page';

export interface MainPagePartialState {
  readonly [MAIN_PAGE_FEATURE_KEY]: MainPageState;
}

export interface MainPageState {
  hotels: Hotel[];
}

export const initialState: MainPageState = {
  hotels: []
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
  }
  return state;
}
