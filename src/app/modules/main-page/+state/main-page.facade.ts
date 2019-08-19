import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromMainPageActions } from './main-page.actions';
import { mainPageQuery } from './main-page.selectors';
import { MainPagePartialState } from './main-page.reducer';

@Injectable()
export class MainPageFacade {
  hotels$ = this.store.pipe(select(mainPageQuery.getHotels));

  constructor(private store: Store<MainPagePartialState>) {}

  getHotels(): void {
    this.store.dispatch(new fromMainPageActions.GetHotels());
  }
}
