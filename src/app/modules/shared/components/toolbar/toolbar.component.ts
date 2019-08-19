import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../../../user/login-dialog/login-dialog.component';
import { Observable } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '../../../../../store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLogged$: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe();
    this.isLogged$ = this.store.select<boolean>('isLogged');
  }

  onLogin(): void {
    this.dialog.open(LoginDialogComponent, {
      data: {
        isRegisterView: false
      },
      disableClose: true,
      panelClass: 'login__wrapper'
    });
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }

  onProfile(): void {
    this.router.navigate(['my-profile']);
  }
}
