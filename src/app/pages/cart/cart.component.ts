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
  
    listDetailsCart: any;

    loadListDetailsCart(): void{
      this.detailsCart.listDetailsCart().subscribe((resp:any)=>{
        this.listDetailsCart = resp.data;
      })
    }
  
    ngOnInit(): void {
      this.loadListDetailsCart();
    }

    onDelete(id: number){
      console.log(id);
      this.detailsCart.deleteDetailsCart({
        id
      })
      .subscribe((resp:any)=>{
        this.loadListDetailsCart();
      })
    }
}
