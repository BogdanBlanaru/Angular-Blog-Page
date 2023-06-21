import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { registerContent } from '../content/register.content';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() format = '';
  @Input() name = '';

  content = registerContent;

  specialCharacterRegex = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]+/.toString();
  upperCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/.toString();

  constructor() {}

  ngOnInit(): void {}
}
