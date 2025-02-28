import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../../services/shared.service';
import { catchError, map, Observable, of } from 'rxjs';
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
    private SharedService: SharedService,
    private serv:ApiService,
    private router:Router
  ){}

  listDetailsCart: any[]=[];
  isCartOpen = false;
  cartItemCount: number = 0;
  cId: number = 0;


  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
  
    getCartId(): Observable<number> {
    const id = localStorage.getItem('idUser');
      if (!id) {
        return of(0);
      }

  const numericId = parseInt(id);
  return this.serv.listInfoUsersById(numericId).pipe(
    map((res: any) => {
      if (res && res.data && res.data[0]?.carts?.id) {
        console.log("shop->cardId : ", res.data[0].carts.id);
        return res.data[0].carts.id;
      } else {
        console.error(res);
        return 0;
      }
    }),
    catchError(error => {
      console.error(error);
      return of(0);
    })
  );
  }

  loadListDetailsCart(): void{
    this.getCartId().subscribe(cartId => {
      this.detailsCart.listByCart(cartId).subscribe((resp: any) => {
        this.listDetailsCart = resp.data;
        this.cartItemCount = this.listDetailsCart.length;
        this.cId = cartId;
      })
    })
  }

  ngOnInit(): void {
    console.log("sono la navbar")
    this.loadListDetailsCart();
    this.SharedService.count$.subscribe((value: number) => {
      console.log("aumento il numerino");
      this.cartItemCount += value;
    })
    
  }

  logout(){
   this.auth.setLoggedOut();
  }

  updateCartItemCount(newCount: number) {
    this.cartItemCount = newCount;
  }

  onRecieveNumber(length: number) {
    this.cartItemCount = length - 1; 
  }

}
