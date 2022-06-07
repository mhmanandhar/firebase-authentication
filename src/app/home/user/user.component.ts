import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../authentication/models";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: UserModel;
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('user')!)
  }

  ngOnInit(): void {
  }

  testConsoleLog(userFirstName: string) {
    console.log(`Welcome user: ${userFirstName}`)
    this.userData.first_name = 'TATETSETSE'
  }

}
