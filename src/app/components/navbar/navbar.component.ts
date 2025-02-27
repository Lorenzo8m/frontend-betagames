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
      private auth:AuthService,
      private router:Router

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
   this.router.navigate(['/home']);
  }

}
