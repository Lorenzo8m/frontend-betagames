import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{


  constructor(
      private detailsCart:ApiService,
      private auth: AuthService,
      private router:Router
  ){}

  listDetailsCart: any[]=[];
  isCartOpen = false;
  cartItemCount: number = 0;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
  

  loadListDetailsCart(): void{
    this.detailsCart.listByCart(5).subscribe((resp:any)=>{
      this.listDetailsCart = resp.data;
    });
  }

  ngOnInit(): void {
    console.log("sono la navbar")
    this.loadListDetailsCart();
    this.cartItemCount = this.listDetailsCart.length;
  }

  logout(){
   this.auth.setLoggedOut();
   this.router.navigate(['/home']);
  }

  updateCartItemCount(newCount: number) {
    this.cartItemCount = newCount;
  }

  onRecieveNumber(length: number) {
    this.cartItemCount = length - 1; 
  }

}
