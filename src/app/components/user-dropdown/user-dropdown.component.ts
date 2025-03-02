import { ChangeDetectorRef, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  standalone: false,
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.scss'
})
export class UserDropdownComponent{
  
  @Output() logoutEvent = new EventEmitter<void>();
  
  constructor(private auth : AuthService,
              private router : Router,
              private cdRef: ChangeDetectorRef // Inietta ChangeDetectorRef
  ){}

  get isLoggedIn(): boolean { // Getter per lo stato di autenticazione
    return this.auth.isAutentificated();
  }

  get isAdmin(): boolean { // Getter per il ruolo di amministratore
    return this.auth.isRoleAdmin();
  }

  ngOnInit(): void {
    // Esegui la change detection iniziale
    this.cdRef.detectChanges();
  }

  logout() {
    this.logoutEvent.emit(); // Emette l'evento di logout al componente padre
    
    this.auth.setLoggedOut();
    this.cdRef.detectChanges(); // Forza la change detection dopo il logout
    this.router.navigate(['/login']);
  }

}
