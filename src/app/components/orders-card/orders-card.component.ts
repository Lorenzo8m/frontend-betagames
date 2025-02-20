import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-orders-card',
  standalone: false,
  templateUrl: './orders-card.component.html',
  styleUrl: './orders-card.component.scss'
})
export class OrdersCardComponent {


searchQuery: any;

  constructor(
    private listOrderService:ApiService
  ) { }
  
  listOrders: any[] = [];

  loadListOrders(): void{
    this.listOrderService.listOrder().subscribe((resp: any) => {
      this.listOrders = resp.data;
    })
  }
  onSearch() {
    this.listOrderService.searchByTyping(this.searchQuery).subscribe((resp: any) => {
      this.listOrders = resp.data;
    })
  //console.log(this.searchQuery)
  }
  ngOnInit(): void{
    this.loadListOrders();
  }
  
  getOrderStatus(orderStatus: string): string{
    if (orderStatus.toLocaleLowerCase() === "pending") {
      return "bg-danger";
    }
    else if (orderStatus.toLocaleLowerCase() === "ready") {
      return "bg-warning";
    }
    else if (orderStatus.toLocaleLowerCase() === "delivered") {
      return "bg-success";
    }
    else {
      return "bg-primary";
    }
  }
}
