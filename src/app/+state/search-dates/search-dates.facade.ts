import { Injectable } from '@angular/core';
import { SearchDatesPartialState } from './search-dates.reducer';
import { select, Store } from '@ngrx/store';
import { searchDatesQuery } from './search-dates.selectors';
import { fromSearchDatesActions } from './search-dates.actions';
import { Observable } from 'rxjs';

@Injectable()
export class SearchDatesFacade {
  constructor(private store: Store<SearchDatesPartialState>) {}

  setStartDate(date: string) {
    this.store.dispatch(new fromSearchDatesActions.SetStartDate(date));
  }
  getStartDate() {
    return this.store.pipe(select(searchDatesQuery.getStartDate()));
  }

  setEndDate(date: string) {
    return this.store.dispatch(new fromSearchDatesActions.SetEndDate(date));
  }
  getEndDate() {
    return this.store.pipe(select(searchDatesQuery.getEndDate()));
  }
}
