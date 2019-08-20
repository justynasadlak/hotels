import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then(mod => mod.MainPageModule)
  },
  {
    path: 'hotel-details',
    loadChildren: () =>
      import('./modules/hotel-details/hotel-details.module').then(mod => mod.HotelDetailsModule)
  },
  { path: 'my-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
