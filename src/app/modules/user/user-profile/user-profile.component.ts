import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserData } from '../../../resources/models/userData';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private userData: UserData;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .isAuthenticated()
      .subscribe(login =>
        this.userService.getUserData(login).subscribe(data => (this.userData = data))
      );
  }
}
