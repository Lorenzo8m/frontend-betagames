import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnChanges{

  constructor(
      private detailsCart:ApiService
  ){}

  listDetailsCart: any[]=[];

  loadListDetailsCart(): void{
    this.detailsCart.listByCart(2).subscribe((resp:any)=>{
      this.listDetailsCart = resp.data;
    })
  }

  ngOnInit(): void {
    this.loadListDetailsCart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadListDetailsCart();
  }
}
