import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories-card',
  standalone: false,
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.scss'
})
export class CategoriesCardComponent {

    constructor(private categoriesService: ApiService) {
      
    }
  
    listCategories: any[] = [];
  
    loadListCategories() {
      this.categoriesService.listCategories().subscribe((resp: any) => {
        this.listCategories = resp.data;
      })
    }
    
    ngOnInit() {
      this.loadListCategories();
    }
}