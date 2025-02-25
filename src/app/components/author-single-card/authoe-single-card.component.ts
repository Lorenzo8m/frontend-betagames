import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-authoe-single-card',
  standalone: false,
  templateUrl: './authoe-single-card.component.html',
  styleUrl: './authoe-single-card.component.scss'
})
export class AuthoeSingleCardComponent {
  @Input() authorData!: any;
}
