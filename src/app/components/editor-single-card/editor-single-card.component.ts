import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editor-single-card',
  standalone: false,
  templateUrl: './editor-single-card.component.html',
  styleUrl: './editor-single-card.component.scss'
})
export class EditorSingleCardComponent {

  @Input() editorData!: any;
}
