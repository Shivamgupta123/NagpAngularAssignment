import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  EmailControl: FormControl;
  PasswordControl: FormControl;
  textControl:FormControl;
  isLoginError: boolean = false;
  users : any
  isLoggedIn : boolean
  current_user : any;

  constructor(private userService : UserService,private router : Router) { }
 
  ngOnInit(): void {
    this.EmailControl = new FormControl('', [Validators.required]);
    this.PasswordControl = new FormControl('', [Validators.required]);
    this.textControl= new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      Username: this.EmailControl,
      Password: this.PasswordControl,
    });
  }
  // ngOnDestroy(): void {
  //   this.userService.isLoggedIn.unsubscribe();
  //   this.userService.current_user.unsubscribe();
  // }

  OnSubmit(){
    let userName = this.loginForm.value['Username'];
    let password = this.loginForm.value['Password'];
    console.log(userName)
    console.log(password);
    // this.userService.getAllUsers().subscribe((res : any[]) =>{
    //   console.log(res);
    //   this.users = res;
    //   console.log('inside res');
    //   console.log(userName)
    //   console.log(password);
      
    //  let result =  this.users.filter(x => x.username == userName && x.password == password)
    //  console.log(result);
    //  this.router.navigate(['/grid']);
    // })
    this.userService.authenticate(userName,password);
    this.userService.isLoggedIn.subscribe(res =>{
      // this.isLoggedIn = c;
      this.isLoggedIn = res;
      if(this.isLoggedIn == true){
        localStorage.setItem('isLoggedIn', 'Yes');
        this.router.navigate(['/grid']);
        this.isLoginError = false
        this.userService.current_user.subscribe(c =>{
          this.current_user = c;
         
        })
      }
      else{
        localStorage.setItem('isLoggedIn', 'No');
        this.isLoginError = true
        // window.alert('Username or password entered is incorect. Please try again!')
      }
    })
    console.log('outside res')
    console.log(this.isLoggedIn);
   
    
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}
