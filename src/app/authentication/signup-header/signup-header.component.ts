import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-signup-header',
  templateUrl: './signup-header.component.html',
  styleUrls: ['./signup-header.component.css']
})
export class SignupHeaderComponent implements OnInit {

  @Input() firstName: string
  @Input() lastName: string

  constructor() { }

  ngOnInit(): void {
  }

}
