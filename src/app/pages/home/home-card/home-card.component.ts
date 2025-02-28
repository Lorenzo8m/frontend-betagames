import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  standalone: false,
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {

  @Input() game: any;

  mainSuffixImg: String = ".webp"

  correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }//correctImageName

}
