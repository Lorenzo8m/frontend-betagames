import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { switchMap } from 'rxjs';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input() game: any;
  @Input() cId: number | undefined;

  constructor(private serv:ApiService,private sharedService:SharedService ){}  

  ngOnInit(): void {
    //this.getCartId()
    console.log(this.cId)
  }

  mainSuffixImg: String = ".webp"

  // getCartId():void{
  //   const id = localStorage.getItem('idUser');
  //   if (id !== null) {
  //     const numericId = parseInt(id);
  //     this.serv.listInfoUsersById(numericId)
  //       .subscribe((res:any)=>{
  //         this.cId = res.data[0].carts.id
  //       })
  //   }
  // }
  
  addToCart(gameId: number, quantity: number):void {
      let cartId = this.cId;
      console.log("add ", gameId  + " " + quantity + " " + cartId)
      this.serv.createDetailsCart({
        gameId,
        cartId: this.cId,
        quantity
      }).subscribe((resp:any)=>{
        resp.msg;
        console.log(resp.msg);
        this.sharedService.updateCount(1);
      })
  }//addToCart

  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }//correctImageName
  


}//class