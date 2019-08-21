import { fromSearchDatesActions } from './search-dates.actions';

export const SEARCH_DATES_FEATURE_KEY = 'search-dates';

export interface SearchDatesPartialState {
  readonly [SEARCH_DATES_FEATURE_KEY]: SearchDatesState;
}

export interface SearchDatesState {
  startDate: string;
  endDate: string;
}

export const initialState: SearchDatesState = {
  startDate: '',
  endDate: ''
};

export function searchDatesReducer(
  state: SearchDatesState = initialState,
  action: fromSearchDatesActions.CollectiveType
) {
  switch (action.type) {
    case fromSearchDatesActions.Types.SetStartDate:
      state = { ...state, startDate: action.payload };
      break;
    case fromSearchDatesActions.Types.SetEndDate:
      state = { ...state, endDate: action.payload };
      break;
  }
  return state;
}
