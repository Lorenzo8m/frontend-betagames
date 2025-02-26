import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs/internal/Subject';
import { concatMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit, OnDestroy {
  
  constructor(private serv:ApiService){}

  /*
  listGames: any=[];
  
  ngOnInit(): void {
    this.serv.listGames().subscribe((resp:any)=>{
      this.listGames = resp.data;
    })
  }
  */

  listCategories: any = [];
  selectedCategory: any = null;
  listGames: any = [];

  searchTerm: any=[];  // variabile per il termine di ricerca del nome
  searchInput = new Subject<string>();  //Subject che rappresenti l'evento di input per il debounce

  cId: number | undefined ;

  ngOnInit(): void {
    this.getCartId()
      .pipe(
        concatMap(() => this.loadListCategories()),
        concatMap(() => this.loadListGames())
      )
      .subscribe(
        () => {
          // Operazioni da eseguire dopo aver caricato le categorie e i giochi
        },
        (error: any) => {
          console.error('Errore:', error);
        }
      );

    //aggiungo il debounce all'evento di input per la ricerca
    this.searchInput.pipe(
      debounceTime(500) // Regola il tempo di debounce (in millisecondi) se necessario
    ).subscribe((searchTerm: string) => {
      this.searchByTypingGames(searchTerm);
    });

    console.log("shop: ", this.cId);
  }//ngOnInit

  // ngOnInit(): void {
  //   this.getCartId();
  //   this.loadListCategories(); // Carica tutte le categorie all'avvio
  //   this.loadListGames(); // Carica tutti i giochi all'avvio
  //   //aggiungo il debounce all'evento di input per la ricerca
  //   this.searchInput.pipe(
  //     debounceTime(500) // Adjust the debounce time (in milliseconds) as needed
  //   ).subscribe((searchTerm: string) => {
  //     this.searchByTypingGames(searchTerm)
  //   });
  //   console.log("shoop: ", this.cId)
  // }//ngOnInit

  loadListCategories(): void {
    this.serv.listCategories().subscribe((resp: any) => {
      this.listCategories = resp.data;
    });
  }//loadListCategories

  selectCategory(category: any): void {
    this.selectedCategory = category;
  }//selectCategory

  loadListGames(): void {
    this.serv.listGames().subscribe((resp: any) => {
      this.listGames = resp.data;
    });
  }//loadListGames

  onSearch(event : Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
     this.searchInput.next(searchTerm);
  }//onSearch

  searchByTypingGames(searchTerm:String):void{
    console.log(searchTerm);
    let params: any = {};

    if (searchTerm) {
      params.name = searchTerm;
    }

    if (this.selectedCategory) {
      params.categoriesId = this.selectedCategory.id;
    }

    this.serv.searchByTypingGames(params).subscribe(
      (resp: any) => {
        this.listGames = resp.data;
      },
      (error) => {
        console.error('Errore nella ricerca:', error);
      }
    );
  }//searchByTyping

  //chiude il servizio di ricerca
  ngOnDestroy(): void {
    this.searchInput.complete();
  }

  getCartId():void{
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      this.serv.listInfoUsersById(numericId)
        .subscribe((res:any)=>{
          console.log("shop->cardId : ", res.data[0].carts.id)
          this.cId = res.data[0].cart.id
        })
    }
  }

}
