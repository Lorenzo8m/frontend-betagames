import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss'
})
export class RegistrazioneComponent {

  
  msg:string='';
  rc:boolean=true;

  constructor(private user:ApiService,
            private router:Router
  ){

  }

  onSubmit(signUp:NgForm){

    if(signUp.form.value.password == signUp.form.value.confirm){
      this.createUser(signUp);
    }else{
      this.rc=false;
      this.msg="le password non corrispondono";
    }
  }
  createUser(signUp:NgForm){

    this.user.createUser({
      username:signUp.form.value.username,
      pwd:signUp.form.value.password,
      email:signUp.form.value.email
    }).subscribe(
      (resp:any)=>{
        this.rc = resp;
        if(resp.rc){
          this.router.navigate(["/login"]);
        }else{
          this.msg = resp.msg;
        }
      }
    )
  }

}
