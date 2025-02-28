import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

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

  flag: boolean | null = null;
  message: string = "";
  ssage: string = "";
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
      "editorsId": this.inputUpdate.nativeElement[10].value,
      "categoryId": this.inputUpdate.nativeElement[11].value,
      "authorsId": this.inputUpdate.nativeElement[12].value
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

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data;
    })
  }

  hideModal(id:number): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById(`staticBackdrop${id}`); 
      let modalInstance = bootstrap.Modal.getInstance(modalElement); 
      modalInstance.hide(); 
    }, 3000);
  }

  hideFlag():void {
    setTimeout(() => {
      this.flag = null;
    }, 5000)
  }
}
