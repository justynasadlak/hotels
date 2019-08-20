import { Action } from '@ngrx/store';

export namespace fromUserActions {
  export enum Types {
    GetUsername = '[App] Get Username',
    GetUsernameSuccess = '[App] Get Username Success',
    GetUsernameFail = '[App] Get Username Fail',

    GetIsLogged = '[App] Get isLogged ',
    GetIsLoggedSuccess = '[App] Get isLogged  Success',
    GetIsLoggedFail = '[App] Get isLogged Fail'
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
  export type CollectiveType =
    | GetUsername
    | GetUsernameSuccess
    | GetUsernameFail
    | GetIsLogged
    | GetIsLoggedSuccess
    | GetIsLoggedFail;
}
