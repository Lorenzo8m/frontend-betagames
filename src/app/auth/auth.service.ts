import { Injectable } from '@angular/core';
import { console } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;
  isAdmin = true;

  constructor() { 
    if (localStorage.getItem("isLoggedIn")!= null) {
        console.log("token exist "+ localStorage.getItem("isLoggedIn"));
        if (localStorage.getItem("isLoggedIn") == '0') {
          this.isLoggedIn=false;
        }else{
          this.isAdmin=true;
        }

    }
  }

  isAutentificated(){
    return this.isLoggedIn;
  }


}
