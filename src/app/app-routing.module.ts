import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { HotelDetailsComponent } from './modules/hotel-details/containers/hotel-details/hotel-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then(mod => mod.MainPageModule)
  },
  { path: 'hotel-details', component: HotelDetailsComponent },
  { path: 'my-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
