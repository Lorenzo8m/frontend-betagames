
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  isAttivo = false;
  idUser: any;
  

  constructor(@Inject(PLATFORM_ID) private platformID:object,
    private router:Router
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

/*   setNotAttived(){
    this.isAttivo = false;
  } */

  // setLoggedOut() {
  //   this.isLoggedIn = false;
  //   localStorage.setItem('isLoggedIn', '0');
  //   localStorage.setItem('isAdmin', '0');
  //   localStorage.setItem("idUser","0");
  //   // this.quote.updateQuote({data:[]});
  // }

  setLoggedOut() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.idUser = null;

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('idUser');

    this.router.navigate(['home']);

  }

  setRoleAdmin() {
    this.isAdmin = true;
    //this.isAttivo = true;
    localStorage.setItem('isAdmin', '1');
  }

  setRoleUser() {
    this.isAdmin = false;
    //this.isAttivo = true;
    localStorage.setItem('isAdmin', '0');
  }



  isAutentificated() {
    
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem("isLoggedIn") == '1')
        return true;
    }
    return false;
  }

  isRoleAdmin() {
    return this.isAdmin;
  }

/*   isAttived(){
    return this.isAttivo;
  } */
}


