import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-single-card',
  standalone: false,
  templateUrl: './categories-single-card.component.html',
  styleUrl: './categories-single-card.component.scss'
})
export class CategoriesSingleCardComponent {

  @Input() categoriesData!: any;
}