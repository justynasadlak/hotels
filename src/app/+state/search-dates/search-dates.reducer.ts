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
    case fromSearchDatesActions.Types.GetStartDate:
      state = { ...state, startDate: '' };
      break;
    case fromSearchDatesActions.Types.GetStartDateSuccess:
      state = { ...state, startDate: action.payload };
      break;
    case fromSearchDatesActions.Types.GetEndDate:
      state = { ...state, endDate: '' };
      break;
    case fromSearchDatesActions.Types.GetEndDateSuccess:
      state = { ...state, endDate: action.payload };
      break;
  }
  return state;
}
