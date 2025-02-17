import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  constructor(
    private detailsCart:ApiService
  ){}
  
    listDetailsCart: any[]=[];

    loadListDetailsCart(): void{
      this.detailsCart.listByCart(1).subscribe((resp:any)=>{
        this.listDetailsCart = resp.data;
      })
    }
  
    ngOnInit(): void {
      this.loadListDetailsCart();
    }

    updateQuantity(quantity: number, id: number){
      this.detailsCart.updateDetailsCart({
        quantity,
        id
      })
      .subscribe((resp)=>{
        this.loadListDetailsCart();
      })
    }

    onDelete(id: number){
      this.detailsCart.deleteDetailsCart({
        id
      })
      .subscribe((resp:any)=>{
        this.loadListDetailsCart();
      })
    }
    deleteAll(cartId: number){
      this.detailsCart.deleteAllByCart({
        cartId
      })
      .subscribe((resp:any)=>{
        this.loadListDetailsCart();
      })
    }

    checkout(userId: number, payCardId: number){
      
    }
    // "userId": 2,
    // "payCardId": 1

    totalAmount(): number {
      return this.listDetailsCart.reduce((acc: any, dc:any) => acc + (dc.gamesDTO.price * dc.quantity), 0);
    }
}
