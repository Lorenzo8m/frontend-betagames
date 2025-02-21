import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  qoute = new  BehaviorSubject ( {} );

  currenteQuote = this.qoute.asObservable();

  updateQuote ( newQuote: {} ){ 
    this . qoute . next (newQuote); 
  } 

  constructor() { }
}
