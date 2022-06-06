import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import Validation from "../../utils/validation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  login = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  onLogin() {
    this.login.markAllAsTouched()
    if (!this.login.valid) {
      console.log(JSON.stringify(this.login.value))
      alert('Form not valid.')
    } else {
      this.authService.SignIn(this.f['email'].value, this.f['password'].value).then(() => {
        console.log('---------User Login Successful---------');
      })
    }
  }
}
