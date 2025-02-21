import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() game: any;

  mainSuffixImg: String = ".webp"

  constructor(private serv:ApiService){}
  
  addToCart(gameId: number, cartId: number, quantity: number):void {
      console.log("add ", gameId + " " + cartId + " " + quantity)
      this.serv.createDetailsCart({
        gameId,
        cartId,
        quantity
      }).subscribe((resp:any)=>{
        resp.msg;
        console.log(resp.msg);
      })
  }

  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }
  
}

