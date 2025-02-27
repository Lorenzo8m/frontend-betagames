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
              private router:Router,
  ){}

  listOrdini: any;
  currenteQuote:any;
  selectedOrder: any = null; 
  ngOnInit(): void {
    this.loadListOrdini();
  }

  loadListOrdini():void{
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      console.log("cart", numericId,  typeof numericId)
      this.service.listOrderByUser(numericId)
        .subscribe((r:any)=>{
          this.listOrdini = r.data;
        });
    }  
  }

  loadOrderDetails(order: any) {
    this.selectedOrder = order;
    console.log("Pedido seleccionado:", this.selectedOrder);
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
