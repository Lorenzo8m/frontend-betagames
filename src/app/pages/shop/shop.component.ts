import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

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

  searchTerm: any=[];  // Aggiunta proprietà per il termine di ricerca

  ngOnInit(): void {
    this.loadListGames(); // Carica tutti i giochi all'avvio
    this.loadListCategories(); // Carica tutte le categorie all'avvio
  }//ngOnInit

  loadListCategories(): void {
    this.serv.listCategories().subscribe((resp: any) => {
      this.listCategories = resp.data;
    });
  }//loadListCategories

  selectCategory(category: any): void {
    this.selectedCategory = category;
    // Qui puoi fare quello che ti serve con la categoria selezionata
    console.log('Categoria selezionata:', category);
  }//selectCategory

  loadListGames(): void {
    this.serv.listGames().subscribe((resp: any) => {
      this.listGames = resp.data;
    });
  }//loadListGames
  
  onSubmit(): void {
    let params: any = {};

    if (this.searchTerm) {
      params.name = this.searchTerm;
    }

    if (this.selectedCategory) {
      params.categoriesId = this.selectedCategory.id;
    }

    this.serv.searchByTyping(params).subscribe(
      (resp: any) => {
        this.listGames = resp.data;
      },
      (error) => {
        console.error('Errore nella ricerca:', error);
      }
    );
  }//onSubmit

  searchByTyping(): void {
    let params: any = {};

    if (this.searchTerm) {
      params.name = this.searchTerm;
    }

    if (this.selectedCategory) {
      params.categoriesId = this.selectedCategory.id;
    }

    this.serv.searchByTyping(params).subscribe(
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


}
