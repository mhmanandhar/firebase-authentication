import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupHeaderComponent } from './signup-header/signup-header.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupHeaderComponent
  ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AuthenticationModule { }
