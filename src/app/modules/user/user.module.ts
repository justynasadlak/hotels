import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserFacade } from '../../+state/user/user.facade';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../+state/user/user.effects';
import { StoreModule } from '@ngrx/store';
import { initialState, USER_FEATURE_KEY, userReducer } from '../../+state/user/user.reducer';

@NgModule({
  declarations: [UserBookingsComponent, UserProfileComponent],
  exports: [UserBookingsComponent, UserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, { initialState }),

    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserFacade]
})
export class UserModule {}
