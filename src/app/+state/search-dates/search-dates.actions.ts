import { Action } from '@ngrx/store';

export namespace fromSearchDatesActions {
  export enum Types {
    GetStartDate = '[App] Get Start Date',
    GetEndDate = '[App] Get End Date',

    SetStartDate = '[App] Set Start Date',
    SetEndDate = '[App] Set End Date'
  }

  export class GetStartDate implements Action {
    readonly type = Types.GetStartDate;
  }

  export class SetStartDate implements Action {
    readonly type = Types.SetStartDate;
    constructor(public payload: string) {}
  }

  export class SetEndDate implements Action {
    readonly type = Types.SetEndDate;
    constructor(public payload: string) {}
  }

  export class GetEndDate implements Action {
    readonly type = Types.GetEndDate;
  }

  export type CollectiveType = GetStartDate | SetStartDate | SetEndDate | GetEndDate;
}
