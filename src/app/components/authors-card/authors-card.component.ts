import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-authors-card',
  standalone: false,
  templateUrl: './authors-card.component.html',
  styleUrl: './authors-card.component.scss'
})
export class AuthorsCardComponent {
  
  constructor(private authorsService: ApiService) {
    
  }

  listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
    })
  }
  
  ngOnInit() {
    this.loadListAuthors();
  }
}
