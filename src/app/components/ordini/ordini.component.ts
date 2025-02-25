import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { SubjectServiceService } from '../../services/subject-service.service';

@Component({
  selector: 'app-ordini',
  standalone: false,
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.scss'
})
export class OrdiniComponent implements OnInit {
  
  constructor(private service:ApiService,
              private router:Router,
              private quote:SubjectServiceService
  ){}

  listOrdini: any;
  currenteQuote:any;

  ngOnInit(): void {
    this.quote.currenteQuote.subscribe(
      quote =>  this . currenteQuote = quote 
    )
    this.loadListOrdini();
  }

  loadListOrdini():void{
    this.service.listOrderByUser(this.currenteQuote.data[0].id).subscribe(
      (resp:any)=>{
        this.listOrdini = resp.data;
      }
    )
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
