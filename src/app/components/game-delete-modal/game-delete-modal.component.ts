import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-game-delete-modal',
  standalone: false,
  templateUrl: './game-delete-modal.component.html',
  styleUrl: './game-delete-modal.component.scss'
})
export class GameDeleteModalComponent {

  @Input() gameData!: any;

  listGame: any[] = [];

  constructor(private GameService:ApiService){}


    deleteGame(id: number) {
    console.log("cancello gioco");
    this.GameService.deleteGames({
      "id":id
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
