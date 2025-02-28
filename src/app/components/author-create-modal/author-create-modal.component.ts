import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-author-create-modal',
  standalone: false,
  templateUrl: './author-create-modal.component.html',
  styleUrl: './author-create-modal.component.scss'
})
export class AuthorCreateModalComponent {
  @Output() updateListAuthor: EventEmitter<any[]> = new EventEmitter<any[]>();
  @ViewChild("authorCreate") authorCreate!: ElementRef;

  constructor(private authorsService: ApiService) {
    
  }
    flag: boolean | null = null;
    message: string = "";
    listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
      this.updateListAuthor.emit(this.listAuthors);
    })
  }

  createAuthors() {
    
    this.authorsService.createAuthors({
      "name": this.authorCreate.nativeElement[0].value,
      "lastname": this.authorCreate.nativeElement[1].value,
      "country": this.authorCreate.nativeElement[2].value,
      "biography":this.authorCreate.nativeElement[3].value
    }).subscribe((resp: any) => {
      if (resp.rc) {
        this.flag = resp.rc;
        this.message = resp.msg;
        this.hideModal();
        this.loadListAuthors();
      } else {
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