import { ActionReducerMap } from '@ngrx/store';
import { searchDatesReducer, SearchDatesState } from './+state/search-dates/search-dates.reducer';
import { userReducer, UserState } from './+state/user/user.reducer';

export interface State {
  searchDates: SearchDatesState;
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  searchDates: searchDatesReducer,
  user: userReducer
};
