import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../../../user/login-dialog/login-dialog.component';
import {Observable} from 'rxjs';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  isLogged$: Observable<boolean>;
  user: string;

  constructor(public dialog: MatDialog, private userService: UserService) {

  }

  ngOnInit() {
    this.isLogged$ = this.userService.isLogged;
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
  }
}
