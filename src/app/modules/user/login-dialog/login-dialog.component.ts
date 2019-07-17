import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  private loginForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    console.log('zalogowany');
  }
}
