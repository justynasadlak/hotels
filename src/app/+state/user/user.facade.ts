import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { userQuery } from './user.selectors';
import { UserPartialState } from './user.reducer';
import { fromUserActions } from './user.actions';
import { fromSearchDatesActions } from '../search-dates/search-dates.actions';

@Injectable()
export class UserFacade {
  username$ = this.store.pipe(select(userQuery.getUsername));
  isLogged$ = this.store.pipe(select(userQuery.getIsLogged));

  constructor(private store: Store<UserPartialState>) {}

  getUsername(): void {
    this.store.dispatch(new fromUserActions.GetUsername());
  }

  getIsLogged(): void {
    this.store.dispatch(new fromUserActions.GetIsLogged());
  }

  getUserData(login: string) {
    this.store.dispatch(new fromUserActions.GetUserData(login));
    return this.store.pipe(select(userQuery.getUserData()));
  }

  login() {
    this.setIsLogged(true);
  }

  logout() {
    this.setUsername(null);
    this.setIsLogged(false);
  }
  private setUsername(username: string) {
    return this.store.dispatch(new fromUserActions.SetUsername(username));
  }

  private setIsLogged(isLogged: boolean) {
    return this.store.dispatch(new fromUserActions.SetIsLogged(isLogged));
  }
}
