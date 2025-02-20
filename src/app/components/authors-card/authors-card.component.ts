import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-authors-card',
  standalone: false,
  templateUrl: './authors-card.component.html',
  styleUrl: './authors-card.component.scss'
})
export class AuthorsCardComponent {
  name: string = "";
  lastname: string = "";
  biography: string = "";
  country: string = "";
  authorName: string = "";
  authorLastname: string = "";
  authorCountry: string = "";
  authorBiography: string = "";
  

  constructor(private authorsService: ApiService) {
    
  }

  listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
    })
  }

  createAuthors(name: string, lastname: string, country: string, biography: string) {
    
    this.authorsService.createAuthors({
      "name": name,
      "lastname": lastname,
      "country": country,
      "biography":biography
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListAuthors();
    })
  }

  saveUpdateAuthors(id:number, name:string, lastname:string, country:string, biography:string) {

      this.authorsService.updateAuthors({
      "id" : id,
      "name": name,
      "lastname":lastname,
      "country": country,
      "biography": biography
    }).subscribe((resp:any) => {
      console.log(resp);
      this.loadListAuthors();
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

  
  ngOnInit() {
    this.loadListAuthors();
  }
}
