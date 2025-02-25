import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-game-modify-modal',
  standalone: false,
  templateUrl: './game-modify-modal.component.html',
  styleUrl: './game-modify-modal.component.scss'
})
export class GameModifyModalComponent {

  @Input() gameData!: any;
  @ViewChild('inputUpdate') inputUpdate!: ElementRef;
  constructor(private GameService: ApiService) { }

   listGame: any[] = [];

    saveUpdateGame(id:number) {
    this.GameService.updateGames({
      "id":id,
      "name":this.inputUpdate.nativeElement[0].value,
      "date":this.inputUpdate.nativeElement[1].value,
      "description": this.inputUpdate.nativeElement[2].value,
      "minGameTime":this.inputUpdate.nativeElement[3].value,
      "maxGameTime": this.inputUpdate.nativeElement[4].value,
      "minPlayerNumber":this.inputUpdate.nativeElement[5].value,
      "maxPlayerNumber":this.inputUpdate.nativeElement[6].value,
      "minAge":this.inputUpdate.nativeElement[7].value,
      "price": this.inputUpdate.nativeElement[8].value,
      "stockQuantity":this.inputUpdate.nativeElement[9].value,
      "editorsId":this.inputUpdate.nativeElement[10].value
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListGames();
    })
  }

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data;
    })
  }
}
