import { Action } from '@ngrx/store';

export namespace fromSearchDatesActions {
  export enum Types {
    GetStartDate = '[App] Get Start Date',
    GetStartDateSuccess = '[App] Get Start Date Success',
    GetStartDateFail = '[App] Get Start Date Fail',

    GetEndDate = '[App] Get End Date',
    GetEndDateSuccess = '[App] Get EndDate Success',
    GetEndDateFail = '[App] Get End Date Fail',

    SetStartDate = '[App] Set Start Date',
    SetStartDateSuccess = '[App] Set Start Date Success'
  }

  export class GetStartDate implements Action {
    readonly type = Types.GetStartDate;
  }

  export class GetStartDateSuccess implements Action {
    readonly type = Types.GetStartDateSuccess;

    constructor(public payload: string) {}
  }

  export class GetStartDateFail implements Action {
    readonly type = Types.GetStartDateFail;
  }

  export class SetStartDate implements Action {
    readonly type = Types.SetStartDate;
  }
  export class SetStartDateSuccess implements Action {
    readonly type = Types.SetStartDateSuccess;

    constructor(public payload: string) {}
  }

  export class GetEndDate implements Action {
    readonly type = Types.GetEndDate;
  }

  export class GetEndDateSuccess implements Action {
    readonly type = Types.GetEndDateSuccess;

    constructor(public payload: string) {}
  }

  export class GetEndDateFail implements Action {
    readonly type = Types.GetEndDateFail;
  }
  export type CollectiveType =
    | GetStartDate
    | GetStartDateSuccess
    | GetStartDateFail
    | SetStartDate
    | SetStartDateSuccess
    | GetEndDate
    | GetEndDateSuccess
    | GetEndDateFail;
}
