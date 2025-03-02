import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-profilo',
  standalone: false,
  templateUrl: './info-profilo.component.html',
  styleUrl: './info-profilo.component.scss'
})

export class InfoProfiloComponent implements OnInit {

  constructor(private service:ApiService,
              private auth: AuthService,
              private router: Router
  ){}

  listUser:any[]=[];
  rc: any;
  msg = "";
 

  loadListInfo():void{
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      console.log("cart", numericId,  typeof numericId)
      this.service.listInfoUsersById(numericId)
        .subscribe((r:any)=>{
          this.listUser = r.data;
        });
    }

  }

  ngOnInit(): void {
    this.loadListInfo();
  }

  onDelete(body:{}){
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {

    this.service.deleteUser(body)
    .subscribe(
      (resp:any)=>{
        this.loadListInfo();
        if (resp.rc) {
          this.rc = resp.rc;
          this.msg = resp.msg;
          this.auth.setLoggedOut();
          this.router.navigate(["home"]);
          console.log(this.msg)
        }else{
          this.rc=resp.rc;
          this.msg = resp.msg;
          console.log(this.msg)
        }
      }

    )
  }
  };
  hasActiveUsers(): boolean {
    return this.listUser && Array.isArray(this.listUser) && this.listUser.some(user => user.active);
  }
}

