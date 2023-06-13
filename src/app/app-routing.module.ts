import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterContainerComponent } from './public/register-container/container.component'

const routes: Routes = [
  { path: 'register', component: RegisterContainerComponent }
]

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {}