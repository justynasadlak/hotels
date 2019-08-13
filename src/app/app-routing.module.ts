import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './containers/landing-page/landing-page.component';
import {UserProfileComponent} from './modules/user/user-profile/user-profile.component';
import {AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import {HotelDetailsComponent} from './containers/hotel-details/hotel-details.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'hotel-details', component: HotelDetailsComponent },
  { path: 'my-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
