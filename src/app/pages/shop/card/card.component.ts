import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() game: any;
  @Input() cId: number | undefined;



  userId: any = '';
  isAuth: boolean = false;
  showReviewForm: boolean = false; // Mostra/nasconde il form
  reviews: any[] = [];
  reviewData = {
    score: 1,
    description: '',
    usersId: 0,
    gameId: 0,
    reviewId: null,
  };

  flag: boolean | null = null;
  message:string = "";


  constructor(private serv:ApiService,private sharedService:SharedService, private auth:AuthService ){}  

  showReviewForm: boolean = false; // Mostra/nasconde il form
  reviewData = { score: 1, description: '', usersId: 0, gameId: 0 };
  userId: any  = "";
  isAuth :boolean = false;
  isLogged: boolean = false;

  

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('idUser'); // Ottieni l'ID dal localStorage
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null; // Converte in numero
    this.loadReviews();

    console.log('User ID from localStorage:', this.userId);

    if (localStorage.getItem('isLoggedIn')) {
      this.isAuth = !this.isAuth;
    }
    // if(localStorage.getItem('isLoggedIn')==='0'){
    //   this.isLogged = !this.isLogged;
    // }
    this.isLogged = this.auth.isAutentificated();

  }

  mainSuffixImg: String = '.webp';

  addToCart(gameId: number, quantity: number): void {
    this.serv
      .createDetailsCart({
        gameId,
        cartId: this.cId,
        quantity,
      })
      .subscribe((resp: any) => {
        resp.msg;
        console.log(resp.msg);
        this.message=resp.msg;
        this.flag=resp.rc;
        if (resp.rc) {
          this.sharedService.updateCount(1);
        }
        this.hideFlag()
      })
  }//addToCart


  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }

  // reviews
  loadReviews(): void {
    if (!this.game?.id) return;
    this.serv.listReview(this.game.id).subscribe(
      (data) => (this.reviews = data),
      (error) => console.error('Error loading reviews:', error)
    );
  }

  submitReview(): void {
    if (!this.userId) {
      alert('You must be logged in to add a review.');
      return;
    }
    this.reviewData.usersId = this.userId;
    this.reviewData.gameId = this.game.id;

    const action = this.reviewData.reviewId ? 'updateReview' : 'createReview';

    this.serv[action](this.reviewData).subscribe(
      (response) => {
        if (!response) {
          alert(response);
        } else {
          this.resetForm();
          this.loadReviews();
        }
      },
      (error) => {
        console.error(`Error during ${action}:`, error);
        alert('Failed to process the review.');
      }
    );
  }

  deleteReview(reviewId: number): void {
    //alert(reviewId);

    if (!this.userId) {
      alert('You must be logged in to delete a review.');
      return;
    }
    if (!confirm('Are you sure you want to delete this review?')) 
      return;

    this.serv.deleteReview(reviewId).subscribe(
      (response) => {
        console.log('Review deleted:', response);
        this.loadReviews();
      },
      (error) => {
        console.error('Error deleting review:', error);
        alert('Failed to delete the review.');
      }
    );
  }


  prepareUpdateReview(review: any): void {
    this.reviewData = {
      //  Prende tutte le proprietà dell'oggetto review e le copia nel nuovo oggetto reviewData
      ...review,
      usersId: this.userId,
      gameId: this.game.id,
      reviewId: review.id,
    };
    this.showReviewForm = true;
  }

  prepareCreateReview(): void {
    this.reviewData = {
      score: 1,
      description: '',
      usersId: this.userId,
      gameId: this.game.id,
      reviewId: null,
    };
    this.showReviewForm = true;
  }

  resetForm(): void {
    this.reviewData = {
      score: 1,
      description: '',
      usersId: this.userId,
      gameId: this.game.id,
      reviewId: null,
    };
    this.showReviewForm = false;
  }

  hideFlag(): void {
    setTimeout(() => {
      this.flag = null;
    }, 2000);
  }
  

}
