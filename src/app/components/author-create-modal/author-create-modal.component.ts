import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-author-create-modal',
  standalone: false,
  templateUrl: './author-create-modal.component.html',
  styleUrl: './author-create-modal.component.scss'
})
export class AuthorCreateModalComponent {

  @ViewChild("authorCreate") authorCreate!: ElementRef;

  constructor(private authorsService: ApiService) {
    
  }

    listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
    })
  }

  createAuthors() {
    
    this.authorsService.createAuthors({
      "name": this.authorCreate.nativeElement[0].value,
      "lastname": this.authorCreate.nativeElement[1],
      "country": this.authorCreate.nativeElement[2],
      "biography":this.authorCreate.nativeElement[3]
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListAuthors();
    })
  }

}
