import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./home/admin/admin.component";
import {UserComponent} from "./home/user/user.component";
import {AuthGuard} from "./shared/guard/auth.guard";
// import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], component: AdminComponent},
  { path: 'user', canActivate: [AuthGuard], component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
