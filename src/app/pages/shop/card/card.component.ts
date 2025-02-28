import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

import { switchMap } from 'rxjs';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() game: any;
  @Input() cId: number | undefined;


  constructor(private serv:ApiService,private sharedService:SharedService ){}  

  showReviewForm: boolean = false; // Mostra/nasconde il form
  reviewData = { score: 1, description: '', usersId: 0, gameId: 0 };
  userId: any  = "";
  isAuth :boolean = false; 
  

  ngOnInit(): void {
    console.log(this.cId);
    const storedUserId = localStorage.getItem('idUser'); // Ottieni l'ID dal localStorage
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null; // Converte in numero
    this.loadReviews();

    console.log("User ID from localStorage:", this.userId);

    if(localStorage.getItem('isLoggedIn')){
      this.isAuth = !this.isAuth;
    }
  }
  

  mainSuffixImg: String = '.webp';

  addToCart(gameId: number, quantity: number): void {
    let cartId = this.cId;
    console.log('add ', gameId + ' ' + quantity + ' ' + cartId);
    this.serv
      .createDetailsCart({
        gameId,
        cartId: this.cId,
        quantity,
      })
      .subscribe((resp: any) => {
        resp.msg;
        console.log(resp.msg);
        this.sharedService.updateCount(1);
      })
  }//addToCart


  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }

  // reviews
  reviews: any[] = []; // Nuovo array per le recensioni
  
  loadReviews(): void {
    this.serv.listReview(this.game.id).subscribe(
      (response: any[]) => {  
        console.log("Dati ricevuti prima dell'assegnazione:", response);
        this.reviews = response || []; 
        console.log("Valore aggiornato di reviews:", this.reviews);
      },
      (error) => {
        console.error("Errore nel caricamento delle recensioni:", error);
      }
    );
  }

  // Metodo per inviare una nuova recensione
  submitReview(): void {
    if (!this.userId) {
      alert("You must be logged in to add a review.");
      return;
    }
  
    this.reviewData.usersId = parseInt(this.userId);
    this.reviewData.gameId = this.game.id;
  
    this.serv.createReview(this.reviewData).subscribe(
      (response: any) => {
        if (response.rc === false && response.msg) {
          alert(response.msg);
        } else {
          // Reset del form
          this.showReviewForm = false;
          this.reviewData = { score: 1, description: '', usersId: 0, gameId: 0 };
  
          // Aggiorna la lista delle recensioni chiamando `loadReviews()`
          this.loadReviews();
        }
      },
      (error) => {
        console.error("Error adding review:", error);
        alert("Failed to submit the review.");
      }
    );
  }
  
  deleteReview(reviewId: number, reviewUserId: number): void {
    if (!this.userId) {
      alert("You must be logged in to delete a review.");
      return;
    }
  
    if (parseInt(this.userId) !== reviewUserId) {
      alert("You can only delete your own reviews.");
      return;
    }
  
    const confirmDelete = confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;
  
    this.serv.deleteReview({ id: reviewId }).subscribe(
      (response: any) => {
        console.log("Review deleted:", response);
        // Aggiorna la lista ricaricandola dal backend
        this.loadReviews();
      },
      (error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete the review.");
      }
    );
  }
  
}
