import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { Store } from '../../../store';
import { UserFacade } from '../../+state/user/user.facade';

@NgModule({
  declarations: [UserBookingsComponent, UserProfileComponent],
  exports: [UserBookingsComponent, UserProfileComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
  providers: [UserFacade]
})
export class UserModule {}
