import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { switchMap } from 'rxjs';

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
    cartId: number | null = 0;

    loadListDetailsCart():void{
      const id = localStorage.getItem('idUser');
      if (id !== null) {
        const numericId = parseInt(id);
        console.log("cart", numericId,  typeof numericId)
        this.detailsCart.listInfoUsersById(numericId)
          .pipe(switchMap((res:any)=>{
            console.log(res.data[0].carts.id);
            this.cartId = res.data[0].carts.id;
            return this.detailsCart.listByCart(res.data[0].carts.id);
          }))
          .subscribe((r:any)=>{
            this.listDetailsCart = r.data;
          });
      }
    }
  
    ngOnInit(): void {
      this.loadListDetailsCart()
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
    deleteAll(){
      this.detailsCart.deleteAllByCart({
        cartId : this.cartId
      })
      .subscribe((resp:any)=>{
        this.loadListDetailsCart();
      })
    }

    totalAmount(): number {
      return this.listDetailsCart.reduce((acc: any, dc:any) => acc + (dc.gamesDTO.price * dc.quantity), 0);
    }
}
