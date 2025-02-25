import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-editor-create-modal',
  standalone: false,
  templateUrl: './editor-create-modal.component.html',
  styleUrl: './editor-create-modal.component.scss'
})
export class EditorCreateModalComponent { 
  @Output() creationResult = new EventEmitter<boolean>();
  @ViewChild('createEditor') editor!: ElementRef;

  listEditors: any[] = [];
  constructor(private editorsService: ApiService) { }

  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
    });
  }


  createEditors() {
    console.log(this.editor)  

    this.editorsService.createEditors({
      "name": this.editor.nativeElement[0].value,
      "website": this.editor.nativeElement[1].value,
    }).subscribe((resp: any) => {
      if (resp.rc === true) {
        this.creationResult.emit(true);
        this.loadListEditors();
      } else {
        this.creationResult.emit(false);
      }


    })
  }


}
