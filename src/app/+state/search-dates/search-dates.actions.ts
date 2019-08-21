import { Action } from '@ngrx/store';

export namespace fromSearchDatesActions {
  export enum Types {
    SetStartDate = '[App] Set Start Date',
    SetEndDate = '[App] Set End Date'
  }

  export class SetStartDate implements Action {
    readonly type = Types.SetStartDate;
    constructor(public payload: string) {}
  }

  export class SetEndDate implements Action {
    readonly type = Types.SetEndDate;
    constructor(public payload: string) {}
  }

  export type CollectiveType = SetStartDate | SetEndDate;
}
