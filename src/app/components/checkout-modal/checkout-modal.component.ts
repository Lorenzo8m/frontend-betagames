import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-modal',
  standalone: false,
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss'
})
export class CheckoutModalComponent implements OnInit{

  constructor(
    private serv:ApiService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loadListInfo();
  }

  listUser:any[]=[];
  // payCardId: number | null = null;

  loadListInfo():void{
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      
      this.serv.listInfoUsersById(numericId)
        .subscribe((r:any)=>{
          console.log("modal checkout", r.data)
          this.listUser = r.data[0].listPayCardsDTO;
        });
    }
  }
   // userId: number, payCardId: number
   onSubmit(orderCreate: NgForm){
    //console.log("pippo ",orderCreate.value);
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const userId = parseInt(id);
      const payCardId = 1;
      //creazione ordine
      this.serv.createOrder({
        userId,
        payCardId: orderCreate.form.value.payCardId
      })
      .subscribe((res:any)=>{
        console.log("cechkout")
        this.router.navigate(['shop']);
        //navigate o comunicazione con il padre
        //this.loadListDetailsCart();
      })
    }
  }

  // createPayCard(cardform: NgForm) {
  //     this.service
  //       .createPayCard({
  //         cardNumber: cardform.form.value.cardNumber,
  //         cvv: cardform.form.value.cvv,
  //         userId: this.userId,
  //         billingAddress: cardform.form.value.billingAddress,
  //         cardHolderName: cardform.form.value.cardHolderName,
  //         expirationDate: cardform.form.value.expirationDate,
  //       })
  //       .subscribe((resp: any) => {
  //         this.rc = resp.rc;
  //         if (resp.rc) {
  //           this.router.navigate(['account/ordini']);
  //         } else this.msg = resp.msg;
  //         console.log(this.msg);
  //       });
  // }
}
