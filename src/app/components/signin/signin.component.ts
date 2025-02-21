import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}
  logged: boolean = true;

  onSubmit(loginForm: NgForm) {
    //console.log(signin.form.value);
    this.user
      .login({
        username: loginForm.form.value.username,
        pwd: loginForm.form.value.password,
      })
      .subscribe((resp: any) => {
        this.logged = resp.data?.logged;
        console.log(resp);
        if (resp.data?.logged) {
          console.log('utente loggato role: ' + resp.data.role);
          console.log("sasas"+resp.data.role);
          this.auth.setAutentificate(resp.data?.id);
          if (resp.data.role == 'ADMIN') {
            this.auth.setRoleAdmin();
          } else {
            this.auth.setRoleUser();
          }
         // this.router.navigate(['home']);
        }
      });
  }
}
