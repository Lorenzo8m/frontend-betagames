import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

   constructor(private serv:ApiService){}
  
    listGames: any=[];
  
    ngOnInit(): void {
      this.serv.listGames().subscribe((resp:any)=>{
        this.listGames = resp.data;
      })
    }

    // addToCart(gameId: number, cartId: number, quantity: number):void {
    //   console.log("add ", gameId + " " + cartId + " " + quantity)
    //   this.serv.createDetailsCart({
    //     gameId,
    //     cartId,
    //     quantity
    //   }).subscribe((resp:any)=>{
    //     resp.msg;
    //     console.log(resp.msg);
    //   })
    // }
}
