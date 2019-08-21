import { fromUserActions } from './user.actions';
import { UserData } from '../../resources/models/userData';

export const USER_FEATURE_KEY = 'user';

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export interface UserState {
  username: string;
  isLogged: boolean;
  userData: UserData;
}

export const initialState: UserState = {
  username: null,
  isLogged: false,
  userData: null
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
    case fromUserActions.Types.GetUserData:
      state = { ...state };
      break;
    case fromUserActions.Types.GetUserDataSuccess:
      state = { ...state, userData: action.payload };
      break;
  }
  return state;
}
