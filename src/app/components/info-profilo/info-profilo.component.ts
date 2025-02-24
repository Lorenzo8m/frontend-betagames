import { SubjectServiceService } from './../../services/subject-service.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-info-profilo',
  standalone: false,
  templateUrl: './info-profilo.component.html',
  styleUrl: './info-profilo.component.scss'
})

export class InfoProfiloComponent implements OnInit {

  constructor(private service:ApiService,
          private quote:SubjectServiceService

  ){}

  listUser:any[]=[];
  rc: any;
  msg = "";

  loadListInfo():void{
    let valore = this.quote.getValueCurrentQuote();
    console.log(this.quote.getValueCurrentQuote())
    console.log(valore.data[0].carts.id)
    this.service.listInfoUsersById(valore.data[0].id)
    .subscribe(
      (resp:any)=>{
        this.listUser = resp.data;
      }
    )
  }

  ngOnInit(): void {
    this.loadListInfo();
    console.log(this.quote.getValueCurrentQuote())

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
