import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";

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

  isUsernamePasswordValid = true;
  loading = false;

  login = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  async onLogin() {
    this.loading = true;
    this.login.markAllAsTouched()
    if (!this.login.valid) {
      console.error('Form not valid.')
    } else {
      this.isUsernamePasswordValid = await this.authService.SignIn(this.f['username'].value, this.f['password'].value)
    }
    this.loading = false;
  }
}
