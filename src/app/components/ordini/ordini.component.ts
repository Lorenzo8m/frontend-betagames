import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordini',
  standalone: false,
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.scss'
})
export class OrdiniComponent implements OnInit {
  
  constructor(private service:ApiService,
              private router:Router
  ){}

  listOrdini: any;


  loadListOrdini():void{
    this.service.listOrderByUser(1).subscribe(
      (resp:any)=>{
        this.listOrdini = resp.data;
      }
    )
  }
  ngOnInit(): void {
    this.loadListOrdini();
  }

  onDelete(id: number){
    console.log(id);
    this.service.deleteOrdini({
      id
    })
    .subscribe((resp:any)=>{
      this.loadListOrdini();
    })
  }

}
