import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-author-update-modal',
  standalone: false,
  templateUrl: './author-update-modal.component.html',
  styleUrl: './author-update-modal.component.scss'
})
export class AuthorUpdateModalComponent {

  @Input() authorData!: any;
  @ViewChild("authorUpdate") authorUpdate!: ElementRef;

  constructor(private authorsService: ApiService) { }

  flag: boolean | null = null;
  message: string = "";
  listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
    })
  }
    

  saveUpdateAuthors(id:number) {
    this.authorsService.updateAuthors({
        "id" : id,
        "name": this.authorUpdate.nativeElement[0].value,
        "lastname":this.authorUpdate.nativeElement[1].value,
        "country": this.authorUpdate.nativeElement[2].value,
        "biography": this.authorUpdate.nativeElement[3].value
    }).subscribe((resp: any) => {
        if (resp.rc) {
          this.flag = resp.rc;
          this.message = resp.msg;
          this.hideModal(id);
          this.loadListAuthors();
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

