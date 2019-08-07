import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../resources/models/user';
import {UserData} from '../../../resources/models/userData';
import {Store} from '../../../../store';

export interface DialogData {
  isRegisterView: boolean;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  isRegisterView = false;
  loginForm: FormGroup;
  dialogMessage = 'don\'t you have an account yet?';
  changeViewButtonText = 'register';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private store: Store,
              private dialogRef: MatDialogRef<LoginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.isRegisterView = data.isRegisterView;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(16)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^.*[A-Z]+.*$')]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^.*[A-Z]+.*$')]],
      rememberMe: ['']
    });
  }

  onSubmit(): void {
    !this.isRegisterView ? this.login() : this.signUp();
  }

  onViewChange(): void {
    this.isRegisterView = !this.isRegisterView;
    this.dialogMessage = this.isRegisterView ? 'do you already have an account?' : 'don\'t you have an account yet?';
    this.changeViewButtonText = this.isRegisterView ? 'login' : 'register';
    this.dialogRef.removePanelClass(this.isRegisterView ? 'login__wrapper' : 'register__wrapper');
    this.dialogRef.addPanelClass(this.isRegisterView ? 'register__wrapper' : 'login__wrapper');
  }

  getButtonName(): string {
    return this.isRegisterView ? 'SIGN UP' : 'SIGN IN';
  }

  private login(): void {
    const user: User = {
      'password': this.loginForm.value.password,
      'rememberMe': this.loginForm.value.rememberMe,
      'username': this.loginForm.value.login
    };

    this.userService.getUserToken(user).subscribe(data => {
      localStorage.setItem('token', data.id_token);
      this.userService.login();
      this.store.set('username', user.username);
      this.dialogRef.close();
    }, (error) => {
      console.log('Http Call is failed from component');
    });
  }

  private signUp(): void {
    const userData: UserData = {
      'login': this.loginForm.value.login,
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password,
    };
    this.userService.register(userData).subscribe(d => {
        this.dialogRef.close();
      },
      error1 => console.log(error1));
  }
}
