import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class LateralCartService {
  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  constructor() { }

  toogleCart(open: boolean) {
    console.log("Cambio stato carrello:", open);
    this.cartOpen.next(open);
  }
}
