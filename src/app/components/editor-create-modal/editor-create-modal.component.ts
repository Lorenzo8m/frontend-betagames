import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-editor-create-modal',
  standalone: false,
  templateUrl: './editor-create-modal.component.html',
  styleUrl: './editor-create-modal.component.scss'
})
export class EditorCreateModalComponent { 
  @Output() updateListEditor: EventEmitter<any[]> = new EventEmitter<any[]>();
  @ViewChild('createEditor') editor!: ElementRef;

  flag: boolean | null = null;
  message: string = "";
  listEditors: any[] = [];

  constructor(private editorsService: ApiService) { }

  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
      this.updateListEditor.emit(this.listEditors);
    });
  }

  createEditors() {
    console.log(this.editor)  

    this.editorsService.createEditors({
      "name": this.editor.nativeElement[0].value,
      "website": this.editor.nativeElement[1].value,
    }).subscribe((resp: any) => {
      if (resp.rc === true) {
        this.flag = true;
        this.message = resp.msg;
        this.hideModal();
        this.loadListEditors();
      } else {
        this.flag = false;
        this.message = resp.msg;
        this.hideFlag();
      }
    })
  }

  hideModal(): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById('createModal'); 
      let modalInstance = bootstrap.Modal.getInstance(modalElement); 
      modalInstance.hide(); 
    }, 500);
  }

  hideFlag():void {
    setTimeout(() => {
      this.flag = null;
    }, 1000)
  }

}
