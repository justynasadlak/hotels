import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { userQuery } from './user.selectors';
import { UserPartialState } from './user.reducer';
import { fromUserActions } from './user.actions';

@Injectable()
export class UserFacade {
  username$ = this.store.pipe(select(userQuery.getUsername));
  isLogged$ = this.store.pipe(select(userQuery.getIsLogged));
  userData$ = this.store.pipe(select(userQuery.getUserData));

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
}
