import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SubjectServiceService } from '../../services/subject-service.service';

@Component({
  selector: 'app-games-user',
  standalone: false,
  templateUrl: './games-user.component.html',
  styleUrl: './games-user.component.scss'
})
export class GamesUserComponent {

   constructor(private service:ApiService,
              private quote:SubjectServiceService
  
    ){}
  
    listUser:any[]=[];
    rc: any;
    msg = "";
  
    loadListInfo():void{
      this.service.listInfoUsersById(this.quote.getValueCurrentQuote().data[0].id)
      .subscribe(
        (resp:any)=>{
          this.listUser = resp.data;
        }
      )
    }
  
    ngOnInit(): void {
      this.loadListInfo();
    }
  
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
    }
}
