import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-author-delete-modal',
  standalone: false,
  templateUrl: './author-delete-modal.component.html',
  styleUrl: './author-delete-modal.component.scss'
})
export class AuthorDeleteModalComponent {

  @Input() authorData!: any;

  constructor(private authorsService: ApiService) { }

  flag: boolean | null = null;
  message: string = "";
  listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
    })
  } 

  deleteAuthors(id: number) {
    console.log("sono stato chiamto");
    console.log("id: " + id);
    this.authorsService.deleteAuthors({
      "id":id
    }).subscribe((resp: any) => {
      if (resp.rc) {
        this.flag = resp.rc;
        this.message = resp.msg;
        this.hideModal(id);
        this.loadListAuthors();
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
