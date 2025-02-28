import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-create-modal',
  standalone: false,
  templateUrl: './game-create-modal.component.html',
  styleUrl: './game-create-modal.component.scss'
})
export class GameCreateModalComponent {

  @ViewChild('inputCreate') inputCreate!: ElementRef;
  flag: boolean | null = null;
  message: string = "";
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
      "editorsId": this.inputCreate.nativeElement[10].value,
      "categoryId": this.inputCreate.nativeElement[11].value,
      "authorsId": this.inputCreate.nativeElement[12].value
    }).subscribe((resp: any) => {
       if (resp.rc === true) {
        this.flag = true;
        this.message = resp.msg;
        this.hideModal();
        this.loadListGames();
      } else {
        this.flag = false;
        this.message = resp.msg;
        this.hideFlag();
      }


    })
  }

  hideModal(): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById('createModal'); 
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
