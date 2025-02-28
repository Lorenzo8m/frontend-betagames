import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-delete-modal',
  standalone: false,
  templateUrl: './game-delete-modal.component.html',
  styleUrl: './game-delete-modal.component.scss',
})
export class GameDeleteModalComponent {
  @Output() updateListGames: EventEmitter<any[]> = new EventEmitter<any[]>(); // creo evento emitter

  @Input() gameData!: any;

  flag: boolean | null = null;
  message: string = '';
  listGame: any[] = [];

  constructor(private GameService: ApiService) {}

  deleteGame(id: number) {
    console.log('cancello gioco');
    this.GameService.deleteGames({
      id: id,
    }).subscribe((resp: any) => {
      if (resp.rc) {
        this.flag = true;
        this.message = resp.msg;
        this.hideModal(id);
        this.loadListGames();
      } else {
        this.flag = false;
        this.message = resp.msg;
        this.hideFlag();
      }
    });
  }

  hideModal(id: number): void {
    setTimeout(() => {
      this.flag = null;

      let modalElement = document.getElementById(`deleteStaticBackdrop${id}`);

      if (modalElement) {
        let modalInstance = bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
          modalInstance.hide();
        }

        // Forza la rimozione della classe Bootstrap che blocca la pagina
        modalElement.classList.remove('show');
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.style.display = 'none';
      }

      // Rimuove manualmente eventuali backdrop rimasti
      document.querySelectorAll('.modal-backdrop')
        .forEach((el) => el.remove());

      // Sblocca lo scrolling della pagina rimuovendo la classe che lo impedisce
      document.body.classList.remove('modal-open');
      document.body.style.overflow = ''; // Riattiva lo scrolling
    }, 500);
  }

  hideFlag(): void {
    setTimeout(() => {
      this.flag = null;
    }, 1000);
  }

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data || []; // Assicura che sia un array
      this.updateListGames.emit(this.listGame); // emetti array aggiornato
    });
  }
}
