import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../authentication/models";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Output() consoleLogUser = new EventEmitter<string>();

  @Input() userType: string
  @Input() userData: UserModel

  constructor() { }

  ngOnInit(): void {
    // for test event emit
    this.consoleLogUser.emit(this.userData.first_name)
  }
}
