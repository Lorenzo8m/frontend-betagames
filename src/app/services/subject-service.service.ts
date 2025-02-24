import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  qoute = new  BehaviorSubject <{ data:{
    id:number;
    carts:{id:number}
  }[] }>( { data:[]} );

  currenteQuote = this.qoute.asObservable();

  getValueCurrentQuote(){
    return this.qoute.getValue()
  }

  updateQuote ( newQuote: {data:[]} ){ 
    this . qoute . next (newQuote); 
  } 

  constructor() { }
}
