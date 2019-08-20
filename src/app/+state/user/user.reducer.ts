import { fromUserActions } from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export interface UserState {
  username: string;
  isLogged: boolean;
}

export const initialState: UserState = {
  username: null,
  isLogged: false
};

export function userReducer(
  state: UserState = initialState,
  action: fromUserActions.CollectiveType
) {
  switch (action.type) {
    case fromUserActions.Types.GetUsername:
      state = { ...state };
      break;
    case fromUserActions.Types.GetUsernameSuccess:
      state = { ...state, username: action.payload };
      break;
    case fromUserActions.Types.GetIsLogged:
      state = { ...state };
      break;
    case fromUserActions.Types.GetIsLoggedSuccess:
      state = { ...state, isLogged: action.payload };
      break;
  }
  return state;
}
