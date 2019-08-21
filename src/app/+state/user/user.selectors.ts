import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState } from './user.reducer';

const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const getUsername = createSelector(
  getUserState,
  state => state.username
);
const getIsLogged = createSelector(
  getUserState,
  state => state.isLogged
);

const getUserData = () =>
  createSelector(
    getUserState,
    state => state.userData
  );

export const userQuery = { getUsername, getIsLogged, getUserData };
