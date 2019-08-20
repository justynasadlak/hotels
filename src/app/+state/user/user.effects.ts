import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fromUserActions } from './user.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  @Effect()
  getUsername$ = this.actions$.pipe(
    ofType(fromUserActions.Types.GetUsername),
    switchMap(() => {
      return this.userService
        .isAuthenticated()
        .pipe(map(username => new fromUserActions.GetUsernameSuccess(username)));
    })
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
