import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RegisterData } from '../../models/interfaces/registerInterface'
import { baseURLDatabase } from 'src/environoments/environoment'

@Injectable( {
  providedIn: 'root',
} )
export class RegisterServiceService {
  constructor ( private http: HttpClient ) {}
  getUsers() {
    this.http.get( `${ baseURLDatabase }users` ).subscribe( ( data ) => {
      return data
    } )
  }
  register( data: RegisterData ) {
    alert( data.username )
  }
}
