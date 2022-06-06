import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {SignupModel} from "../models/signup-model";
import {HttpService} from "../../service/http-service";
import {ScriptService} from "../../service/script-service";
import Validation from "../../utils/validation";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
  ]
})

export class SignupComponent implements OnInit {

  signup = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['normal_user'],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_password: ['', Validators.required],
  }, {
    validators: [Validation.match('password', 'confirm_password')]
  })

  phoneInput = null

  constructor(
    private fb: FormBuilder,
    private _http_service: HttpService,
    private _script_service: ScriptService,
    public authService: AuthService
  ) {
    this._script_service.loadScript('intlTelInput').then(() => {
      console.log('International phone code service loaded.')
      const phoneInputField:any = document.getElementById('phone');
      this.phoneInput = (<any>window).intlTelInput(phoneInputField, {
        preferredCountries: ["np", "in"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      })
    }).catch(() => {
      console.log('Could not load international phone code service.')
    })
  }

  ngOnInit(): void {
    this.f['phone'].valueChanges.subscribe(value => {
      let error = document.getElementById('invalid-phone');
      if (error) {
        // @ts-ignore
        if (this.phoneInput && !this.phoneInput.isValidNumber()) {
          error.style.display = ''
        } else {
          error.style.display = 'none'
        }
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signup.controls;
  }

  onSignUp() {
    this.signup.markAllAsTouched()
    if (!this.signup.valid) {
      console.error('Form not valid.')
    } else {
      this.authService.SignUp(this.signup.value)
      // const { first_name, last_name, email, role, confirm_password, password } = this.signup.value
      // let error = document.getElementById('invalid-phone');
      // let payload = {
      //   first_name,
      //   last_name,
      //   phone,
      //   email,
      //   role,
      //   password,
      //   confirm_password
      // }
      // console.log(payload)
      // this._http_service.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
      //   alert(JSON.stringify(data))
      // });
    }
  }

}


