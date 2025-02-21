import { Component } from '@angular/core';
import { RandomNumberServiceService } from '../../services/random-number-service.service';

@Component({
  selector: 'app-home-admin-card',
  standalone: false,
  templateUrl: './home-admin-card.component.html',
  styleUrl: './home-admin-card.component.scss'
})
export class HomeAdminCardComponent {

    totalOrders: number | undefined;
  averageLogins: number | undefined;
  totalRevenue: number | undefined;
  pendingOrders: number | undefined;
  activeCustomers: number | undefined;
  topProduct = { name: 'Prodotto A', sales: 0 };
  positiveFeedback: number | undefined;
  averageDeliveryTime: number | undefined;
  stockProducts: number | undefined;

  constructor(private randomNumberService: RandomNumberServiceService) { }

  ngOnInit(): void {
    this.totalOrders = this.randomNumberService.getRandomNumber();
    this.averageLogins = this.randomNumberService.getRandomNumber(10, 500);
    this.totalRevenue = this.randomNumberService.getRandomNumber(1000, 50000);
    this.pendingOrders = this.randomNumberService.getRandomNumber(1, 50);
    this.activeCustomers = this.randomNumberService.getRandomNumber(50, 1000);
    this.topProduct.sales = this.randomNumberService.getRandomNumber(100, 1000);
    this.positiveFeedback = this.randomNumberService.getRandomNumber(50, 500);
    this.averageDeliveryTime = this.randomNumberService.getRandomNumber(10, 120);
    this.stockProducts = this.randomNumberService.getRandomNumber(100, 5000);
  }
}
