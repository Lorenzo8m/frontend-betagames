import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-singlegame-card',
  standalone: false,
  templateUrl: './singlegame-card.component.html',
  styleUrl: './singlegame-card.component.scss'
})
export class SinglegameCardComponent {
  @Input() gameData!: any;
  
  mainSuffixImg: String = ".webp"
  
    

    correctImageName(gameName: string): string {
    return gameName.replace(/\s+/g, ''); // Sostituisci gli spazi con caratteri di sottolineatura
  }
}
