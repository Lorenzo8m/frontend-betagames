import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-delete-modal',
  standalone: false,
  templateUrl: './game-delete-modal.component.html',
  styleUrl: './game-delete-modal.component.scss'
})
export class GameDeleteModalComponent {
  @Output() updateListGames: EventEmitter<any[]> = new EventEmitter<any[]>(); // creo evento emitter

  @Input() gameData!: any;

  flag: boolean | null = null;
  message: string = "";
  listGame: any[] = [];

  constructor(private GameService:ApiService){}


    deleteGame(id: number) {
    console.log("cancello gioco");
    this.GameService.deleteGames({
      "id":id
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


    })
  }

  hideModal(id:number): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById(`deleteStaticBackdrop${id}`); 
      let modalInstance = bootstrap.Modal.getInstance(modalElement); 
      modalInstance.hide();
    }, 3000);
  }

  hideFlag():void {
    setTimeout(() => {
      this.flag = null;
    }, 5000)
  }

    loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data;
    })
  }
}
