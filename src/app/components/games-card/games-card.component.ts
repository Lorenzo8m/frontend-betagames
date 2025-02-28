import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-games-card',
  standalone: false,
  templateUrl: './games-card.component.html',
  styleUrl: './games-card.component.scss',
})
export class GamesCardComponent implements OnInit {
  constructor(private GameService: ApiService) {}

  listGame: any[] = [];

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data;
    });
  }

  ngOnInit() {
    this.loadListGames();
  }

  // Metodo per aggiornare la lista quando viene emesso l'evento dal figlio
  updateListGames(updatedGames: any[]) {
      this.listGame = updatedGames;
  }
}
