import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { TeamsDetailsComponent } from './components/teams-details/teams-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KeyApiInterceptor } from './interceptor/key-api.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    TeamsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: KeyApiInterceptor , multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
