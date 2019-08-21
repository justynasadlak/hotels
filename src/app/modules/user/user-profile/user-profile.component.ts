import { Component, OnInit } from '@angular/core';
import { UserData } from '../../../resources/models/userData';
import { UserFacade } from '../../../+state/user/user.facade';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: UserData;

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.username$.subscribe(login =>
      this.userFacade.getUserData(login).subscribe(data => {
        this.userData = data;
      })
    );
  }
}
