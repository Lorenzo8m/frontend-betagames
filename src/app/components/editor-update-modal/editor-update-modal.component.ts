import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-editor-update-modal',
  standalone: false,
  templateUrl: './editor-update-modal.component.html',
  styleUrl: './editor-update-modal.component.scss'
})
export class EditorUpdateModalComponent {

  @Input() editorData!: any;
  @ViewChild("editorUpdate") editorUpdate!: ElementRef;
    listEditors: any[] = [];

  constructor(private editorsService: ApiService) { }
  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
    });
  }



  saveModifyEditors(id:number) {
    this.editorsService.updateEditors({
      "id" : id,
      "name" : this.editorUpdate.nativeElement[0].value,
      "website" : this.editorUpdate.nativeElement[1].value,
    }).subscribe((resp:any) => {
      this.loadListEditors();
    })
  }
}
