import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../authentication/models";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userData: UserModel;
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('user')!)
  }

  ngOnInit(): void {
  }

  testConsoleLog(userFirstName: string) {
    console.log(`Welcome user: ${userFirstName}`)
  }
}
