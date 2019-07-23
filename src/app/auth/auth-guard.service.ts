import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private userService: UserService) {
  }


  canActivate() {
    return this.userService.isAuthenticated().pipe(
      tap(res => console.log(res)),
      switchMap((res: string) => {
        if (!!!res) {
          this.router.navigate(['']);
        };
        return of(!!res);
      }),
      catchError(err => of(err))
    );
  }
}
