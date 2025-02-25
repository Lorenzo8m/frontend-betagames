import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-games-user',
  standalone: false,
  templateUrl: './games-user.component.html',
  styleUrl: './games-user.component.scss'
})
export class GamesUserComponent implements OnInit{

   constructor(private service:ApiService,
              
  
    ){}
  ngOnInit(): void {
    this.loadListInfo();
  }
  
    listUser:any[]=[];
    rc: any;
    msg = "";
    userId: number = 0;

    loadListInfo():void{
      const id = localStorage.getItem('idUser');
      if (id !== null) {
        const numericId = parseInt(id);
        console.log("cart", numericId,  typeof numericId)
        this.service.listInfoUsersById(numericId)
          .subscribe((r:any)=>{
            this.listUser = r.data;
          });
    }}

    onDelete(body:{}){
      this.service.deleteUser(body)
      .subscribe(
        (resp:any)=>{
          this.loadListInfo();
          if (resp.rc) {
            this.rc = resp.rc;
            this.msg = resp.msg;
            console.log(this.msg)
          }else{
            this.rc=resp.rc;
            this.msg = resp.msg;
            console.log(this.msg)
          }
        }
      )
    };
    hasActiveUsers(): boolean {
      return this.listUser && Array.isArray(this.listUser) && this.listUser.some(user => user.active);
    };
}
