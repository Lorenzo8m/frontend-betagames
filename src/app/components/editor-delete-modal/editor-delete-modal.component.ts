import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-editor-delete-modal',
  standalone: false,
  templateUrl: './editor-delete-modal.component.html',
  styleUrl: './editor-delete-modal.component.scss'
})
export class EditorDeleteModalComponent {

  @Input() editorData!: any;

  constructor(private editorsService: ApiService) { };

  listEditors: any[] = [];

  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
    });
  }
    deleteEditors(id: number) {
    this.editorsService.deleteEditors({
      "id":id
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListEditors();
    })
  }
}
