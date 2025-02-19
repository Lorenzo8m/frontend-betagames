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

  ){}

  listUser:any;

  loadListInfo():void{
    this.service.listInfoUsersById(1)
    .subscribe(
      (resp:any)=>{
        this.listUser = resp.data;
      }
    )
  }

  ngOnInit(): void {
    this.loadListInfo();
  }

  onDelete(id:number){}

}
