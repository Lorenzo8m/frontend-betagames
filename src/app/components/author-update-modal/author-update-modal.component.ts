import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

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
      }).subscribe((resp:any) => {
        console.log(resp);
        this.loadListAuthors();
    })
  }
}
