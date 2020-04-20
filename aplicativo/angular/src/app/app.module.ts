import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityComponent } from './pages/security/security.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/login/error/error.component';
import { NuevaEncuestaComponent } from './pages/nueva-encuesta/nueva-encuesta.component';
import { EncuestasComponent } from './pages/admin/encuestas/encuestas.component';

@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    LogoutComponent,
    AdminComponent,
    BodyComponent,
    LoginComponent,
    ErrorComponent,
    NuevaEncuestaComponent,
    EncuestasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
  entryComponents: [ 
    ErrorComponent]
})
export class AppModule { }
