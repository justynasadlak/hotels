import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../../../user/login-dialog/login-dialog.component';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { UserFacade } from '../../../../+state/user/user.facade';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  // isLogged$: Observable<boolean>;
  isLogged$ = this.userFacade.isLogged$;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    // this.userService.isAuthenticated().subscribe();
    // this.isLogged$ = this.store.select<boolean>('isLogged');
    this.userFacade.getIsLogged();
    this.isLogged$ = this.userFacade.isLogged$;
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
    this.userFacade.logout();
    this.userService.logout();
    this.router.navigate(['']);
  }

  onProfile(): void {
    this.router.navigate(['my-profile']);
  }
}
