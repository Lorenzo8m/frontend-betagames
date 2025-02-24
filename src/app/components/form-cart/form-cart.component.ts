import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SubjectServiceService } from '../../services/subject-service.service';

@Component({
  selector: 'app-form-cart',
  standalone: false,
  templateUrl: './form-cart.component.html',
  styleUrl: './form-cart.component.scss'
})
export class FormCartComponent {

  msg : string = '';
  rc : any;
 // expirationDate: Date = new Date();

  constructor(private service:ApiService,
            private router:Router,
            private  quote:SubjectServiceService
  ){}

  onSubmit(cardform:NgForm){
    this.createPayCard(cardform)
    console.log("Credo la card");
    console.log(typeof cardform.form.value.expirationDate)
    console.log(cardform)
  }


  createPayCard(cardform:NgForm){
    this.service.createPayCard({
      cardNumber: cardform.form.value.cardNumber,
      cvv: cardform.form.value.cvv,
      userId: this.quote.getValueCurrentQuote().data[0].id,
      billingAddress: cardform.form.value.billingAddress,
      cardHolderName: cardform.form.value.cardHolderName,
      expirationDate: cardform.form.value.expirationDate,
      
    }).subscribe(
      (resp:any)=>{
        this.rc = resp.rc;
        if (resp.rc){
          this.router.navigate(["account/ordini"])
        } else
          this.msg = resp.msg;
          console.log(this.msg)
          
      }
    )
  }
}
