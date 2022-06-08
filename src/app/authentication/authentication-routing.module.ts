import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import {AuthGuard} from "../shared/guard/auth.guard";

const routes: Routes = [
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'signup', canActivate: [AuthGuard], component: SignupComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
