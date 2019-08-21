import { Action } from '@ngrx/store';
import { UserData } from '../../resources/models/userData';

export namespace fromUserActions {
  export enum Types {
    GetUsername = '[App] Get Username',
    GetUsernameSuccess = '[App] Get Username Success',
    GetUsernameFail = '[App] Get Username Fail',

    GetIsLogged = '[App] Get isLogged ',
    GetIsLoggedSuccess = '[App] Get isLogged  Success',
    GetIsLoggedFail = '[App] Get isLogged Fail',

    GetUserData = '[App] Get UserData',
    GetUserDataSuccess = '[App] Get UserData Success',
    GetUserDataFail = '[App] Get UserData Fail',

    SetUsername = '[App] Set Username',
    SetIsLogged = '[App] Get isLogged'
  }

  export class GetUsername implements Action {
    readonly type = Types.GetUsername;
  }
  export class GetUsernameSuccess implements Action {
    readonly type = Types.GetUsernameSuccess;

    constructor(public payload: string) {}
  }

  export class GetUsernameFail implements Action {
    readonly type = Types.GetUsernameFail;
  }
  export class SetUsername implements Action {
    readonly type = Types.SetUsername;

    constructor(public payload: string) {}
  }
  export class SetIsLogged implements Action {
    readonly type = Types.SetIsLogged;

    constructor(public payload: boolean) {}
  }

  export class GetIsLogged implements Action {
    readonly type = Types.GetIsLogged;
  }

  export class GetIsLoggedSuccess implements Action {
    readonly type = Types.GetIsLoggedSuccess;

    constructor(public payload: boolean) {}
  }

  export class GetIsLoggedFail implements Action {
    readonly type = Types.GetIsLoggedFail;
  }

  export class GetUserData implements Action {
    readonly type = Types.GetUserData;
    constructor(public payload: string) {}
  }
  export class GetUserDataSuccess implements Action {
    readonly type = Types.GetUserDataSuccess;

    constructor(public payload: UserData) {}
  }

  export class GetUserDataFail implements Action {
    readonly type = Types.GetUserDataFail;
  }

  export type CollectiveType =
    | GetUsername
    | GetUsernameSuccess
    | GetUsernameFail
    | GetIsLogged
    | GetIsLoggedSuccess
    | GetIsLoggedFail
    | GetUserData
    | GetUserDataSuccess
    | GetUserDataFail
    | SetUsername
    | SetIsLogged;
}
