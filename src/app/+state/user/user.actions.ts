import { Action } from '@ngrx/store';

export namespace fromUserActions {
  export enum Types {
    GetUsername = '[App] Get Username',
    GetUsernameSuccess = '[App] Get Username Success',
    GetUsernameFail = '[App] Get Username Fail'
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

  export type CollectiveType = GetUsername | GetUsernameSuccess | GetUsernameFail;
}
