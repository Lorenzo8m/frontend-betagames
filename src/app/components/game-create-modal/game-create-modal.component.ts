import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-game-create-modal',
  standalone: false,
  templateUrl: './game-create-modal.component.html',
  styleUrl: './game-create-modal.component.scss'
})
export class GameCreateModalComponent {

  @ViewChild('inputCreate') inputCreate!: ElementRef;

    listGame: any[] = [];

  constructor(private GameService:ApiService) {
    
  }
  
  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data;
    })
  }



  createGames() {
    this.GameService.createGames({
      "name":this.inputCreate.nativeElement[0].value,
      "date":this.inputCreate.nativeElement[1].value,
      "description": this.inputCreate.nativeElement[2].value,
      "minGameTime":this.inputCreate.nativeElement[3].value,
      "maxGameTime": this.inputCreate.nativeElement[4].value,
      "minPlayerNumber":this.inputCreate.nativeElement[5].value,
      "maxPlayerNumber":this.inputCreate.nativeElement[6].value,
      "minAge":this.inputCreate.nativeElement[7].value,
      "price": this.inputCreate.nativeElement[8].value,
      "stockQuantity":this.inputCreate.nativeElement[9].value,
      "editorsId":this.inputCreate.nativeElement[10].value
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListGames();
    })
  }
}
