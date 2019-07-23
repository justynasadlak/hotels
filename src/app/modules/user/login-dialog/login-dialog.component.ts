import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {MatDialogRef} from '@angular/material';
import {User} from '../../../resources/models/user';
import {UserData} from '../../../resources/models/userData';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  register = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<LoginDialogComponent>) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(16)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^.*[A-Z]+.*$')]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^.*[A-Z]+.*$')]],
      rememberMe: ['']
    });
  }

  onSubmit() {
    !this.register ? this.login() : this.signUp();
  }

  onRegister() {
    this.register = true;
    console.log('do rejestracji');
  }

  getButtonName() {
    return this.register ? 'SIGN UP' : 'SIGN IN';
  }

  login() {
    const user: User = {
      'password': this.loginForm.value.password,
      'rememberMe': this.loginForm.value.rememberMe,
      'username': this.loginForm.value.login
    };

    this.userService.getUserToken(user).subscribe(data => {
      localStorage.setItem('token', data.id_token);
      console.log(data);
      this.userService.login();
      this.dialogRef.close();
    }, (error) => {
      console.log('Http Call is failed from component');
    });
  }

  signUp() {
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
