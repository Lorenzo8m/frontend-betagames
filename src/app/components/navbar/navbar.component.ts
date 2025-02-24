import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { SubjectServiceService } from '../../services/subject-service.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(
      private detailsCart:ApiService,
      private auth:AuthService

  ){}

  listDetailsCart: any[]=[];

  loadListDetailsCart(): void{
    this.detailsCart.listByCart(1).subscribe((resp:any)=>{
      this.listDetailsCart = resp.data;
    });
  }

  ngOnInit(): void {
    this.loadListDetailsCart();
  }

  logout(){
   this.auth.setLoggedOut();
  }
}
