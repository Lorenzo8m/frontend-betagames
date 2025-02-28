import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private countSource = new BehaviorSubject<number>(0); // Inizializza il valore
  count$ = this.countSource.asObservable(); // Observable per ascoltare i cambiamenti

  updateCount(newValue: number) {
    this.countSource.next(newValue); // Aggiorna il valore
  }
}
