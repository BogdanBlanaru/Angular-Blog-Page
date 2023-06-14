import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterContainerComponent } from './public/register-container/container.component'
import { HomeComponent } from './public/home/home.component'

const routes: Routes = [
  { path: 'register', component: RegisterContainerComponent },
  { path: '', component: HomeComponent }
]

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {}