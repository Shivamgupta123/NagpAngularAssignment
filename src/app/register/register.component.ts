import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  firstNameControl : FormControl;
  lastnameControl : FormControl
  emailControl : FormControl;
  phoneControl : FormControl;
  usernameControl : FormControl;
  passwordControl : FormControl;
  addressControl : FormControl
  contryControl : FormControl
  stateControl : FormControl
  cityControl : FormControl
  zipControl : FormControl
  checkBoxControl : FormControl
  button_disabled : boolean = true
  form_disabled : boolean = true
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.firstNameControl = new FormControl('', [Validators.required]);
    this.lastnameControl = new FormControl('', [Validators.required]);
    this.emailControl = new FormControl('', [Validators.required]);
    this.phoneControl = new FormControl('', [Validators.required]);
    this.usernameControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);
    this.addressControl = new FormControl('', [Validators.required]);
    this.contryControl = new FormControl('', [Validators.required]);
    this.stateControl = new FormControl('', [Validators.required]);
    this.cityControl = new FormControl('', [Validators.required]);
    this.zipControl = new FormControl('', [Validators.required]);
    

    this.registerForm = new FormGroup({
      first_name: this.firstNameControl,
      last_name: this.lastnameControl,
      email: this.emailControl,
      phone: this.phoneControl,
      username : this.usernameControl,
      password : this.passwordControl,
      address: this.addressControl,
      country: this.contryControl,
      state: this.stateControl,
      city: this.cityControl,
      zip: this.zipControl
    })
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
  OnFormSubmit(){
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe((res) =>{
      window.alert('User registered successfully!!');
      this.router.navigate(['/login']);
    })
  }
}
