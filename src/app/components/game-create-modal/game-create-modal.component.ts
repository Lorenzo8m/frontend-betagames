import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-create-modal',
  standalone: false,
  templateUrl: './game-create-modal.component.html',
  styleUrl: './game-create-modal.component.scss',
})
export class GameCreateModalComponent implements OnInit {
  @Output() updateListGames: EventEmitter<any[]> = new EventEmitter<any[]>(); // creo evento emitter
  @ViewChild('inputCreate') inputCreate!: ElementRef;
  
  flag: boolean | null = null;
  message: string = '';
  listGame: any[] = [];
  listEditor: any[] = [];
  listAuthor: any[] = [];
  listCategory: any[] = [];

  constructor(private GameService: ApiService) {}

  ngOnInit(): void {
    this.loadListEditors();
    this.loadListAuthors();
    this.loadListCategory();
  }

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data || []; // Assicura che sia un array
      this.updateListGames.emit(this.listGame);// emetti array aggiornato
    });
  }
  
  loadListEditors(): void {
    this.GameService.listEditors().subscribe((resp: any) => {
      console.log('Editor ricevuti:', resp);
      this.listEditor = resp.data || []; // Assicura di estrarre SOLO l'array `data`
    });
  }

  loadListCategory(): void {
    this.GameService.listCategories().subscribe((resp: any) => {
      console.log('Category ricevuti:', resp);
      this.listCategory = resp.data || []; // Assicura di estrarre SOLO l'array `data`
    });
  }

  loadListAuthors(): void {
    this.GameService.listAuthors().subscribe((resp: any) => {
      console.log('Authors ricevuti:', resp);
      this.listAuthor = resp.data || []; // Assicura di estrarre SOLO l'array `data`
    });
  }

  createGames() {
    this.GameService.createGames({
      name: this.inputCreate.nativeElement[0].value,
      date: this.inputCreate.nativeElement[1].value,
      description: this.inputCreate.nativeElement[2].value,
      minGameTime: this.inputCreate.nativeElement[3].value,
      maxGameTime: this.inputCreate.nativeElement[4].value,
      minPlayerNumber: this.inputCreate.nativeElement[5].value,
      maxPlayerNumber: this.inputCreate.nativeElement[6].value,
      minAge: this.inputCreate.nativeElement[7].value,
      price: this.inputCreate.nativeElement[8].value,
      stockQuantity: this.inputCreate.nativeElement[9].value,
      editorsId: this.inputCreate.nativeElement[10].value,
      categoryId: this.inputCreate.nativeElement[11].value,
      authorsId: this.inputCreate.nativeElement[12].value,
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
    });
  }

  hideModal(): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById('createModal');
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    }, 500);
  }

  hideFlag(): void {
    setTimeout(() => {
      this.flag = null;
    }, 500);
  }
}
