import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../../../user/login-dialog/login-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLogged: boolean;
  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.isLogged = !!localStorage.getItem('token');
  }

  onLogin() {
    this.dialog.open(LoginDialogComponent, {
      disableClose: true,
      width: '250px',
      maxHeight: '350px'
    });
  }

  onLogout() {
    localStorage.removeItem('token');
  }
}
