import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from "./authentication/authentication.module";
import {HttpService} from "./service/http-service";
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { AdminComponent } from './home/admin/admin.component';
import { UserComponent } from './home/user/user.component';
import { UserDetailComponent } from './home/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }
