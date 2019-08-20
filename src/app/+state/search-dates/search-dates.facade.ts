import { Injectable } from '@angular/core';
import { SearchDatesPartialState } from './search-dates.reducer';
import { select, Store } from '@ngrx/store';
import { searchDatesQuery } from './search-dates.selectors';
import { fromSearchDatesActions } from './search-dates.actions';

@Injectable()
export class SearchDatesFacade {
  startDate$ = this.store.pipe(select(searchDatesQuery.getStartDate));
  endDate$ = this.store.pipe(select(searchDatesQuery.getEndDate));

  constructor(private store: Store<SearchDatesPartialState>) {}

  getStartDate() {
    this.store.dispatch(new fromSearchDatesActions.GetStartDate());
  }

  getEndDate() {
    this.store.dispatch(new fromSearchDatesActions.GetEndDate());
  }
}
