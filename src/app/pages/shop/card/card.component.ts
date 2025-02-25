import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SubjectServiceService } from '../../../services/subject-service.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input() game: any;
  @Input() cId: number | undefined;

  constructor(private serv:ApiService
  ){}  

  ngOnInit(): void {
    this.getCartId()
  }

  mainSuffixImg: String = ".webp"

  getCartId():void{
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      this.serv.listInfoUsersById(numericId)
        .subscribe((res:any)=>{
          this.cId = res.data[0].carts.id
        })
    }
  }
  
  addToCart(gameId: number, quantity: number):void {
      let cartId = this.cId;
      console.log("add ", gameId  + " " + quantity + " " + cartId)
      this.serv.createDetailsCart({
        gameId,
        cartId,
        quantity
      }).subscribe((resp:any)=>{
        resp.msg;
        console.log(resp.msg);
      })
  }//addToCart

  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }//correctImageName
  


}//class