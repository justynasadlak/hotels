import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../../../user/login-dialog/login-dialog.component';
import {Observable} from 'rxjs';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {Store} from '../../../../../store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  isLogged$: Observable<boolean>;
  user: string;

  constructor(public dialog: MatDialog, private userService: UserService, private router: Router, private store: Store) {

  }

  ngOnInit() {
    this.userService.isAuthenticated().subscribe();
    this.isLogged$ = this.store.select<boolean>('isLogged');

  }

  ngOnDestroy(): void {
  }

  onLogin() {
    this.dialog.open(LoginDialogComponent, {
      disableClose: true,
      width: '250px',
      maxHeight: '350px'
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  onProfile() {
    this.router.navigate(['my-profile']);
  }
}
