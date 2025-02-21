import { SubjectServiceService } from './../../services/subject-service.service';
import { Component, OnDestroy } from '@angular/core';
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
export class SigninComponent implements OnDestroy{
  constructor(
    private user: ApiService,
    private auth: AuthService,
    private router: Router,
    private quote: SubjectServiceService
  ) {}

  ngOnDestroy(): void {
    this.convert = localStorage.getItem('idUser');
    const value: string | null = localStorage.getItem('idUser');
    console.log("Ciao")
    console.log(value)
    // Verifica se il valore è nullo e lo trasforma in un numero se non lo è
    let numberValue: number | null = null;
    if (value !== null) {
      console.log("Ciao")
      numberValue = parseInt(value, 10);
     console.log(this.user.listInfoUsersById);
    
     console.log("Ciao")
    }  }
    
  logged: boolean = true;
  convert: string | null = '';

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
          this.auth.setAutentificate(resp.data?.id);
          // console.log(this.user.listInfoUsersById(resp.data?.id));
          // this.quote.updateQuote(this.user.listInfoUsersById(resp.data?.id));
          console.log(this.quote.currenteQuote);
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
