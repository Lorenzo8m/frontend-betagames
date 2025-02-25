import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-author-delete-modal',
  standalone: false,
  templateUrl: './author-delete-modal.component.html',
  styleUrl: './author-delete-modal.component.scss'
})
export class AuthorDeleteModalComponent {

  @Input() authorData!: any;

  constructor(private authorsService: ApiService) { }


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
      console.log(resp);
      this.loadListAuthors();
    })
  }
}
