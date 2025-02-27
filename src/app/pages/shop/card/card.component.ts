import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() game: any;
  @Input() cId: number | undefined;

  showReviewForm: boolean = false; // Mostra/nasconde il form
  reviewData = { score: 1, description: '', usersId: 0, gameId: 0 };
  userId: any  = "";
  

  constructor(private serv: ApiService) {}

  ngOnInit(): void {
    console.log(this.cId);
    const storedUserId = localStorage.getItem('idUser'); // Ottieni l'ID dal localStorage
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null; // Converte in numero
  
    console.log("User ID from localStorage:", this.userId);
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
      });
  }

  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
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
        console.log("Review response:", response);

        if (response.rc === false && response.msg) {
          alert(response.msg); // Mostra l'errore del backend (es. "Hai già recensito questo gioco")
        } else {
          alert("Your review has been submitted!");
          this.showReviewForm = false;
          this.reviewData = { score: 1, description: '', usersId: 0, gameId: 0 }; // Reset del form
        }
      },
      (error) => {
        console.error("Error adding review:", error);
        alert("Failed to submit the review.");
      }
    );
  }

  deleteReview(reviewId: number, reviewUserId: number): void {
    // const userId = localStorage.getItem('idUser'); // Ottieni l'ID dell'utente dal localStorage
  
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
        alert("Review deleted successfully!");
  
        // Aggiorna la lista delle recensioni rimuovendo quella eliminata
        this.game.listReviewsDTO = this.game.listReviewsDTO.filter((review: any) => review.id !== reviewId);
      },
      (error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete the review.");
      }
    );
  }
  
}
