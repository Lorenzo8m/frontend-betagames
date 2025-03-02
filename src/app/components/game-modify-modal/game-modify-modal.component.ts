import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-game-modify-modal',
  standalone: false,
  templateUrl: './game-modify-modal.component.html',
  styleUrl: './game-modify-modal.component.scss',
})
export class GameModifyModalComponent implements OnInit {
  @Input() gameData!: any;
  @ViewChild('inputUpdate') inputUpdate!: ElementRef;
  @Output() updateListGames: EventEmitter<any[]> = new EventEmitter<any[]>(); // creo evento emitter

  constructor(private GameService: ApiService) {}

  flag: boolean | null = null;
  message: string = '';
  ssage: string = '';
  listGame: any[] = [];
  listEditor: any[] = [];
  listAuthor: any[] = [];
  listCategory: any[] = [];

  ngOnInit(): void {
    this.loadListEditors();
    this.loadListAuthors();
    this.loadListCategory();
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

  saveUpdateGame(id: number) {
    this.GameService.updateGames({
      id: id,
      name: this.inputUpdate.nativeElement[0].value,
      date: this.inputUpdate.nativeElement[1].value,
      description: this.inputUpdate.nativeElement[2].value,
      minGameTime: this.inputUpdate.nativeElement[3].value,
      maxGameTime: this.inputUpdate.nativeElement[4].value,
      minPlayerNumber: this.inputUpdate.nativeElement[5].value,
      maxPlayerNumber: this.inputUpdate.nativeElement[6].value,
      minAge: this.inputUpdate.nativeElement[7].value,
      price: this.inputUpdate.nativeElement[8].value,
      stockQuantity: this.inputUpdate.nativeElement[9].value,
      editorsId: this.inputUpdate.nativeElement[10].value,
      categoryId: this.inputUpdate.nativeElement[11].value,
      authorsId: this.inputUpdate.nativeElement[12].value,
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

  loadListGames() {
    this.GameService.listGames().subscribe((resp: any) => {
      this.listGame = resp.data || []; // Assicura che sia un array
      this.updateListGames.emit(this.listGame);// emetti array aggiornato
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
      document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

      // Sblocca lo scrolling della pagina rimuovendo la classe che lo impedisce
      document.body.classList.remove('modal-open');
      document.body.style.overflow = ''; // Riattiva lo scrolling
    }, 500);
  }

  hideFlag(): void {
    setTimeout(() => {
      this.flag = null;
    }, 500);
  }
}
