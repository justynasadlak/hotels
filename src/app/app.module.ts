import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LoginDialogComponent } from './modules/user/login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './modules/core/interceptors/http-request.interceptor';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { Store } from '../store';
import { UserBookingsComponent } from './modules/user/user-bookings/user-bookings.component';
import { RouterModule } from '@angular/router';
import { HotelDetailsComponent } from './modules/hotel-details/containers/hotel-details/hotel-details.component';
import { HotelDetailsViewComponent } from './modules/hotel-details/components/hotel-details-view/hotel-details-view.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainPageModule } from './modules/main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    UserProfileComponent,
    UserBookingsComponent,
    HotelDetailsComponent,
    HotelDetailsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }
      }
    ),
    EffectsModule.forRoot([]),
    MainPageModule
  ],
  entryComponents: [LoginDialogComponent],
  providers: [
    Store,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
