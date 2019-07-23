import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './modules/shared/shared.module';
import {LoginDialogComponent} from './modules/user/login-dialog/login-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './modules/core/interceptors/http-request.interceptor';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { BookingComponent } from './modules/booking/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginDialogComponent,
    UserProfileComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [LoginDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
