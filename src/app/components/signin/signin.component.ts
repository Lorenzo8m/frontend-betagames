import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { switchMap }  from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(
    private user: ApiService,
    private auth: AuthService,
    private router: Router  ) {}
    
  logged: boolean = true;
  convert: string | null = '';
  errorMessage: string = '';

  onSubmit(loginForm: NgForm) {
    this.errorMessage = '';
    this.user
      .login({
        username: loginForm.form.value.username,
        pwd: loginForm.form.value.password,
      })
      .pipe(
        switchMap((resp: any) => {
          if (!resp.rc) {
            this.errorMessage = resp.msg || 'Errore generico';
            throw new Error(resp.msg || 'User not found');
          }
          this.logged = resp.data?.logged;
          console.log(resp);
          if (resp.data?.logged) {
            console.log('User Role Logged: ' + resp.data.role);
            this.auth.setAutentificate(resp.data?.id);
            if (resp.data.role === 'ADMIN') {
              this.auth.setRoleAdmin();
            } else {
              this.auth.setRoleUser();
            }
          }
          return this.user.listInfoUsersById(resp.data?.id);
        })
      )
      .subscribe(
        (resp: any) => {
          if (!resp || !resp.data) {
            this.errorMessage = resp.msg;
            return;
          }
          console.log('Informazioni utente:', resp.data);
          if (this.auth.isLoggedIn) {
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.error('Errore nelle chiamate API:', error);
          this.errorMessage = error;
        }
      );
  }

  // onSubmit(loginForm: NgForm) {
  //   //console.log(signin.form.value);
  //   this.user
  //     .login({
  //       username: loginForm.form.value.username,
  //       pwd: loginForm.form.value.password,
  //     })
  //     .subscribe((resp: any) => {
  //       this.logged = resp.data?.logged;
  //       console.log(resp);
  //       if (resp.data?.logged) {
  //         console.log('utente loggato role: ' + resp.data.role);
  //         this.auth.setAutentificate(resp.data?.id);
  //         // console.log(this.user.listInfoUsersById(resp.data?.id));
  //         // this.quote.updateQuote(this.user.listInfoUsersById(resp.data?.id));
  //         console.log(this.quote.currenteQuote);
  //         if (resp.data.role == 'ADMIN') {
  //           this.auth.setRoleAdmin();
  //         } else {
  //           this.auth.setRoleUser();
  //         }
       
  //         // this.router.navigate(['home']);
  //       }
  //     });


  // ////
  // }
}
