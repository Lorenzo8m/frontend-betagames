import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  standalone: false,
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.scss'
})
export class UserDropdownComponent {
  
  @Output() logoutEvent = new EventEmitter<void>();
  
  constructor(private auth : AuthService,
              private router : Router
  ){}


  logout() {
    this.logoutEvent.emit(); // Emette l'evento di logout al componente padre
  }

}
