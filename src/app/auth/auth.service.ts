
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SubjectServiceService } from '../services/subject-service.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  idUser: any;
  

  constructor(@Inject(PLATFORM_ID) private platformID:object,
    private quote:SubjectServiceService
  ) {
    if (isPlatformBrowser(this.platformID)) {
      
      if (localStorage.getItem('isLoggedIn') != null) {
        console.log('token exist ' + localStorage.getItem('isLoggedIn'));
        if (localStorage.getItem('isLoggedIn') == '0') {
          this.isLoggedIn = false;
        } else {
          this.isAdmin = true;
        }
        if (localStorage.getItem('isAdmin') == '0') {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      } else {
        console.log('Token not exist');
        localStorage.setItem('isLoggedIn', '0');
        localStorage.setItem('isAdmin', '0');
      }
    }
    
    console.log('logged: ' + this.isLoggedIn);
    console.log('Admin: ' + this.isAdmin);
  }

  setAutentificate(id: any) {
    this.isLoggedIn = true;
    localStorage.setItem('idUser', id);
    localStorage.setItem('isLoggedIn', '1');
  }

  setLoggedOut() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', '0');
    localStorage.setItem('isAdmin', '0');
    localStorage.setItem("idUser","0");
    this.quote.updateQuote({data:[]});
  }

  setRoleAdmin() {
    this.isAdmin = true;
    localStorage.setItem('isAdmin', '1');
  }

  setRoleUser() {
    this.isAdmin = false;
    localStorage.setItem('isAdmin', '0');
  }

  isAutentificated() {
    return this.isLoggedIn;
  }

  isRoleAdmin() {
    return this.isAdmin;
  }
}


