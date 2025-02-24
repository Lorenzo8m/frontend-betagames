import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.loadListCategories(); // Carica tutte le categorie all'avvio
    this.loadListGames(); // Carica tutti i giochi all'avvio
    //aggiungo il debounce all'evento di input per la ricerca
    this.searchInput.pipe(
      debounceTime(500) // Adjust the debounce time (in milliseconds) as needed
    ).subscribe((searchTerm: string) => {
      this.searchByTypingGames(searchTerm)
    });
  }//ngOnInit

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


  // addToCart(gameId: number, cartId: number, quantity: number):void {
  //   console.log("add ", gameId + " " + cartId + " " + quantity)
  //   this.serv.createDetailsCart({
  //     gameId,
  //     cartId,
  //     quantity
  //   }).subscribe((resp:any)=>{
  //     resp.msg;
  //     console.log(resp.msg);
  //   })
  // }

  

  //chiude il servizio di ricerca
  ngOnDestroy(): void {
    this.searchInput.complete();
  }

}
