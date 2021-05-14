import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NagpAngularAssignment';
  isLoggedIn : boolean
  currentUser : any
  constructor(private userService : UserService,private router : Router, private activatedRoute : ActivatedRoute) {
   }
  ngOnDestroy(): void {
    this.userService.isLoggedIn.unsubscribe();
    this.userService.current_user.unsubscribe();
  }
  ngOnInit(): void {
   this.userService.isLoggedIn.subscribe(res =>{
     console.log('inside app component init')
     this.isLoggedIn = res;
     console.log(res);
     
   })
   this.userService.current_user.subscribe(res =>{
     this.currentUser = res
   })
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['login']);
   
  }
}
