import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   baseUrl = environment.BASE_URL;
  // baseUrl = 'http://localhost:3000'
  isLoggedIn : BehaviorSubject<boolean>
  current_user : BehaviorSubject<any>
  constructor(private _http : HttpClient) {
    this.isLoggedIn = new BehaviorSubject(false);
    this.current_user = new BehaviorSubject({});
   }

  getAllUsers(){
    return this._http.get(this.baseUrl + '/users')
  }

  authenticate(username : string, password : string){
    this.getAllUsers().subscribe((res : any[]) =>{
      let result =  res.filter(x => x.username == username && x.password == password)
    //console.log(result);
    if(result.length != 0){
      this.isLoggedIn.next(true);
      this.current_user.next(result[0]);
    }
    else{
      this.isLoggedIn.next(false);
    }
    });
    
  }
  registerUser(user : any){
    return this._http.post(this.baseUrl+'/users', user)
  }
  logout(){
    localStorage.setItem('isLoggedIn', 'No');
    this.isLoggedIn.next(false);
    this.current_user.next({});
  }
}
