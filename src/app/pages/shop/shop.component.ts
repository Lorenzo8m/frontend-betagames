import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

   constructor(private games:ApiService){}
  
    listGames: any;
  
    ngOnInit(): void {
      this.games.listGames().subscribe((resp:any)=>{
        this.listGames = resp.data;
        console.log("ciccio");
      })
    }
}
