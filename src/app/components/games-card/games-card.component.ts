import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-games-card',
  standalone: false,
  templateUrl: './games-card.component.html',
  styleUrl: './games-card.component.scss'
})
export class GamesCardComponent {

  name: string ="" ;
  date: string ="";
  description: string="";
  minGameTime: number = 0;
  maxGameTime: number = 0;
  minPlayerNumber: number = 0;
  maxPlayerNumber: number = 0;
  minAge: number = 0;
  price: number = 0.00;
  stockQuantity: number = 0;
  editorsId: number = 0;
  gameName: string="";
  gameDate: string="";
  gameDescription: string="";
  gameMinTime: number = 0;
  gameMaxTime: number = 0;
  gameMinPlayerNumber: number = 0;
  gameMaxPlayerNumber: number = 0;
  gameMinAge: number = 0;
  gamePrice: number = 0;
  gameEditorsId: number = 0;
  gameStockQuantity: any;

  constructor(private GameService: ApiService) {
    
  }

  listGame: any[] = [];

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data;
    })
  }



  createGames(name:string, date: string, description: string, minGameTime: number, maxGameTime: number, minPlayerNumber: number, maxPlayerNumber: number, minAge: number, stockQuantity:number, price: number, editorsId: number) {
    this.GameService.createGames({
            "name":name,
      "date":date,
      "description": description,
      "minGameTime":minGameTime,
      "maxGameTime": maxGameTime,
      "minPlayerNumber":minPlayerNumber,
      "maxPlayerNumber":maxPlayerNumber,
      "minAge": minAge,
      "stockQuantity": stockQuantity,
      "price":price,
      "editorsId":editorsId
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListGames();
    })
  }
  
  ngOnInit() {
    this.loadListGames();
  }

}
