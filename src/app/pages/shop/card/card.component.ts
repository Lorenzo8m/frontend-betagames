import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SubjectServiceService } from '../../../services/subject-service.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input() game: any;
  quoteUser:number=0;


  constructor(private serv:ApiService,
          private quote:SubjectServiceService
  ){}  

  ngOnInit(): void {

  }

  mainSuffixImg: String = ".webp"

  
  addToCart(gameId: number, quantity: number):void {
      const cartId = this.quote.getValueCurrentQuote().data[0].carts.id;
      console.log("add ", gameId  + " " + quantity)
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