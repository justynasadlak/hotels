import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {UserService} from '../services/user.service';
import {catchError, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private userService: UserService) {
  }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isAuthenticated().pipe(
      switchMap((res: string) => {
        if (!!!res) {
          this.router.navigate(['']);
        }
        return of(!!res);
      }),
      catchError(err => of(err))
    );
  }
}
