import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sidecart',
  standalone: false,
  templateUrl: './sidecart.component.html',
  styleUrl: './sidecart.component.scss'
})
export class SidecartComponent implements  OnChanges{



  @Input() isOpen: boolean = false;
  @Output() cartChanged = new EventEmitter<number>();

  constructor(private detailsCartService: ApiService){}
  mainSuffixImg: String = ".webp"
  listDetailsCart: any[] = [];
  total: number = 0;

  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Cambiate:', changes['isOpen']);
    if (changes['isOpen']) {
      this.loadCartItems();
    }
  }
  
  loadCartItems() {
    this.detailsCartService.listByCart(5).subscribe((resp: any) => {
      let tempTotal = 0
      this.listDetailsCart = resp.data;
      resp.data.forEach((element: any) => {
         tempTotal += this.calculateTotal(element.quantity, element.gamesDTO.price)
      });
      this.total = tempTotal;
    })
  }
  
  addItem(dc: any) {
    console.log('Aggiunto un elemento');
    dc.quantity += 1;
    this.detailsCartService.updateDetailsCart({
      "quantity": dc.quantity,
      "id": dc.id
    }).subscribe((resp: any) => {
      console.log(resp);
      this.total += dc.gamesDTO.price
    })
  }

  removeItem(dc: any) {
    console.log('Rimosso un elemento');
    if (dc.quantity > 1) {
      dc.quantity -= 1;
      this.detailsCartService.updateDetailsCart({
        "quantity": dc.quantity,
        "id": dc.id
      }).subscribe((resp: any) => {
        console.log(resp);
        this.total -= dc.gamesDTO.price
      })
    }
  }
  deleteGame(id:number) {
    this.detailsCartService.deleteDetailsCart({
      "id":id
    }).subscribe((resp: any) => {
      this.loadCartItems();
      console.log(this.listDetailsCart.length)
      this.cartChanged.emit(this.listDetailsCart.length);
      
    })
  }

  calculateTotal(quantity: number, price:number):number {
    return quantity * price;
  }
}
