import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RegisterComponent } from './public/register/register.component'
import { RegisterContainerComponent } from './public/register-container/container.component'
import { HomeComponent } from './public/home/home.component'
import { HttpClientModule } from '@angular/common/http'


@NgModule( {
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterContainerComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule {}
