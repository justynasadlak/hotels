import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../../../user/login-dialog/login-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public dialog: MatDialog) {
  }

  onLogin() {
    this.dialog.open(LoginDialogComponent, {
      disableClose: true,
      width: '250px',
      maxHeight: '350px'
    });
  }
}
