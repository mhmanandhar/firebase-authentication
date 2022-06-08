import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  isUsernamePasswordValid = true;
  loading = false;

  username: string = ''
  password: string = ''

  ngOnInit(): void {
  }

  async onLogin(f: NgForm) {
    this.loading = true;
    f.form.markAllAsTouched()
    if (!f.valid) {
      console.error('Form not valid')
    } else {
      this.isUsernamePasswordValid = await this.authService.SignIn(this.username, this.password)
    }
    this.loading = false;
  }
}
