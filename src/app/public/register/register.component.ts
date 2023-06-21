import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms'
import { registerContent } from '../content/register.content'
import { HttpClient } from '@angular/common/http'
import { RegisterServiceService } from '../services/register-service.service'
import { baseURLDatabase } from 'src/environoments/environoment'

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent implements OnInit {
  showError = false
  content = registerContent
  userNameError = ''
  passwordError = ''
  usersArray: any
  userIsDuplicate = false

  get isSubmitDisabled() {
    return !this.registerForm.valid
  }

  get isInvalidUsername() {
    return this.registerForm.controls.username.touched && !this.registerForm.controls.username.valid
  }

  get isInvalidPassword() {
    return this.registerForm.controls.password.touched && !this.registerForm.controls.password.valid
  }

  constructor ( private formBuilder: FormBuilder, private http: HttpClient, private registerService: RegisterServiceService ) {

  }
  registerForm = this.formBuilder.group( {
    username: [ '', [ Validators.required, ( control: AbstractControl ) => this.usernameValidator( control ) ] ],
    password: [ '', [ Validators.required, ( control: AbstractControl ) => this.passwordValidator( control ) ] ]
  } )

  ngOnInit(): void {
    this.getUsers()
  }

  usernameValidator( control: AbstractControl ): ValidationErrors | null {
    const nameRegex = /^[a-zA-Z]+$/
    const isValidName = nameRegex.test( control.value )
    const hasValidLength = control.value.length > 5 && control.value.length < 12
    const valid = isValidName && hasValidLength
    if ( !hasValidLength ) {
      this.userNameError = this.content.userName.usernameLengthError
    }
    if ( !isValidName ) {
      this.userNameError = this.content.userName.userNameAlphanumericError
    }

    if ( valid ) {
      this.userNameError = ''
    }

    return valid ? null : { invalid: true }
  }

  passwordValidator( control: AbstractControl ): ValidationErrors | null {
    const lengthRegex = /^.{8,}$/
    const specialCharacterRegex = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]+/
    const upperCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/
    const isValidLength = lengthRegex.test( control.value )
    const hasSpecialCharacters = specialCharacterRegex.test( control.value )
    const hasUpperCase = upperCaseRegex.test( control.value )
    const valid = isValidLength && hasSpecialCharacters && hasUpperCase

    if ( !hasSpecialCharacters ) {
      this.passwordError = this.content.password.passwordSpecialCharactersError
    }
    if ( !hasUpperCase ) {
      this.passwordError = this.content.password.passwordUpperCaseError
    }
    if ( !isValidLength ) {
      this.passwordError = this.content.password.passwordLengthError
    }
    if ( valid ) {
      this.passwordError = ''
    }

    return valid ? null : { invalid: true }
  }

  getUsers() {
    this.http.get( `${ baseURLDatabase }users` ).subscribe( data => {
      this.usersArray = data
    } )

  }

  isDuplicateUser() {
    return this.usersArray.some( ( user: { username: string } ) => user.username === this.registerForm.controls.username.value )

  }



  async onSubmit() {
    this.showError = true
    this.registerForm.markAllAsTouched()
    if ( await this.isDuplicateUser() ) {
      this.userNameError = this.content.userName.notUniqueError
    }
    if ( !this.registerForm.controls.username.value ) {
      this.userNameError = this.content.default.emptyInputErrorMessage
    }
    if ( !this.registerForm.controls.password.value ) {
      this.passwordError = this.content.default.emptyInputErrorMessage
    }
    if ( this.registerForm.valid && !( await this.isDuplicateUser() ) ) {
      this.registerService.register( { username: 'Test', password: 'passwword' } )
    }

  }
}
