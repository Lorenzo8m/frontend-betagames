import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-editor-delete-modal',
  standalone: false,
  templateUrl: './editor-delete-modal.component.html',
  styleUrl: './editor-delete-modal.component.scss'
})
export class EditorDeleteModalComponent {

  @Input() editorData!: any;

  constructor(private editorsService: ApiService) { };

  flag: boolean | null = null;
  message: string = "";
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
      if (resp.rc) {
        this.hideModal(id);
        this.flag = resp.rc;
        console.log(this.flag);
        this.message = resp.msg;
        this.loadListEditors();
      }
      else {
        this.flag = resp.rc;
        this.message = resp.msg;
        this.hideFlag();
      }
    })
  }

    hideModal(id:number): void {
      setTimeout(() => {
      console.log("sono stato chiamato")
      this.flag = null;
      let modalElement = document.getElementById(`deleteStaticBackdrop${id}`);
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
