import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  register = false;

  constructor(private formBuilder: FormBuilder) {
  }

  private loginForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.maxLength(16)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[A-Z]+')]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[A-Z]+')]]
  });

  onSubmit() {
    console.log('zalogowany');
  }

  onRegister() {
    this.register = true;
    console.log('do rejestracji');
  }

  getButtonName() {
    return this.register ? 'SIGN UP' : 'SIGN IN';
  }
}
