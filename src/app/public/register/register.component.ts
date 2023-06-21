import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { registerContent } from '../register.content';
import { HttpClient } from '@angular/common/http';
import { RegisterServiceService } from '../services/register-service.service';
import { baseURLDatabase } from 'src/environoments/environoment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  showError = false;
  content = registerContent;
  userNameError = '';
  passwordError = '';
  usersArray: any;
  userIsDuplicate = false;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(12),
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern(/[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]+/),
    Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/),
  ]);

  registerForm = new FormGroup({
    username: this.username,
    password: this.password,
  });

  get isSubmitDisabled() {
    return !this.registerForm.valid;
  }

  get isInvalidUsername() {
    return (
      this.registerForm.controls.username.touched &&
      !this.registerForm.controls.username.valid
    );
  }

  get isInvalidPassword() {
    return (
      this.registerForm.controls.password.touched &&
      !this.registerForm.controls.password.valid
    );
  }

  constructor(
    private http: HttpClient,
    private registerService: RegisterServiceService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get(`${baseURLDatabase}users`).subscribe((data) => {
      this.usersArray = data;
    });
  }

  isDuplicateUser() {
    return this.usersArray.some(
      (user: { username: string }) =>
        user.username === this.registerForm.controls.username.value
    );
  }

  async onSubmit() {
    this.showError = true;
    this.registerForm.markAllAsTouched();
    if (await this.isDuplicateUser()) {
      this.userNameError = this.content.userName.notUniqueError;
    }
    if (!this.registerForm.controls.username.value) {
      this.userNameError = this.content.default.emptyInputErrorMessage;
    }
    if (!this.registerForm.controls.password.value) {
      this.passwordError = this.content.default.emptyInputErrorMessage;
    }
    if (this.registerForm.valid && !(await this.isDuplicateUser())) {
      this.registerService.register({
        username: 'Test',
        password: 'passwword',
      });
    }
  }
}
