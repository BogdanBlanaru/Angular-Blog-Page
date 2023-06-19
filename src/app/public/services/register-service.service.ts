import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { registerData } from '../interfaces/registerInterface'
import { baseURLDatabase } from 'src/environoments/environoment'

@Injectable( {
  providedIn: 'root'
} )
export class RegisterServiceService {

  constructor ( private http: HttpClient ) {}

  register( data: registerData ) {
    alert( 'Account registartion completed succefully' )
  }
}
