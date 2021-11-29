import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { LoginComponent } from './login/login.component';
import { NewPasswordEntryComponent } from './new-password-entry/new-password-entry.component';
import { ViewErrorComponent } from './view-error/view-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewPasswordEntryComponent,
    ViewErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CanDeactivateGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
