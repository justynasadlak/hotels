import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAIN_PAGE_FEATURE_KEY, MainPageState } from './main-page.reducer';

const getMainPageState = createFeatureSelector<MainPageState>(MAIN_PAGE_FEATURE_KEY);

const getHotels = createSelector(
  getMainPageState,
  state => state.hotels
);

export const mainPageQuery = {
  getHotels
};
