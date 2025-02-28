import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-editor-update-modal',
  standalone: false,
  templateUrl: './editor-update-modal.component.html',
  styleUrl: './editor-update-modal.component.scss'
})
export class EditorUpdateModalComponent {

  @Input() editorData!: any;
  @ViewChild("editorUpdate") editorUpdate!: ElementRef;
    flag: boolean | null = null;
    message: string = "";
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
    }).subscribe((resp: any) => {
      if (resp.rc) {
        this.flag = resp.rc;
        this.message = resp.msg;
        this.hideModal(id);
        this.loadListEditors();
      } else {
        this.flag = resp.rc;
        this.message = resp.msg;
        this.hideFlag();
      }
    })
  }

  
    hideModal(id:number): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById(`staticBackdrop{id}`); 
      let modalInstance = bootstrap.Modal.getInstance(modalElement); 
      modalInstance.hide(); 
    }, 3000);
  }

  hideFlag():void {
    setTimeout(() => {
      this.flag = null;
    }, 5000)
  }
}