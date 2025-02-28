import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

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
  user:any;
  selectedOrder: any = null; 
  ngOnInit(): void {
    this.loadListOrdini();
  }

  loadListOrdini():void{
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      console.log("cart", numericId,  typeof numericId)

          this.service.SearchByTypingUser(numericId).pipe(
      switchMap((resp: any) => {
        this.user = resp.data[0]; // Salva l'utente
        console.log("Utente trovato:", this.user);

        // Se l'utente è attivo, esegui la richiesta degli ordini
        if (this.user && this.user.active) {
          return this.service.listOrderByUser(numericId);
        } else {
          return of({ data: [] }); // Se l'utente è inattivo, restituisci un array vuoto
        }
      })
    ).subscribe((r: any) => {
      this.listOrdini = r.data;
      console.log("Ordini trovati:", this.listOrdini);
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
