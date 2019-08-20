import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SEARCH_DATES_FEATURE_KEY, SearchDatesState } from './search-dates.reducer';

const getSearchDatesState = createFeatureSelector<SearchDatesState>(SEARCH_DATES_FEATURE_KEY);

const getStartDate = createSelector(
  getSearchDatesState,
  state => state.startDate
);

const setStartDate = date =>
  createSelector(
    getSearchDatesState,
    state => (state.startDate = date)
  );

const getEndDate = createSelector(
  getSearchDatesState,
  state => state.endDate
);

export const searchDatesQuery = {
  getStartDate,
  setStartDate,
  getEndDate
};
