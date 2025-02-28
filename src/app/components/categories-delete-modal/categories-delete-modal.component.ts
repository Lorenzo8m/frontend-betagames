import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-categories-delete-modal',
  standalone: false,
  templateUrl: './categories-delete-modal.component.html',
  styleUrl: './categories-delete-modal.component.scss'
})
export class CategoriesDeleteModalComponent {

  @Input() categoriesData!: any;

  constructor(private categoriesService: ApiService) { }

  flag: boolean | null = null;
  message: string = ""
  listCategories: any[] = [];


  loadListCategories() {
    this.categoriesService.listCategories().subscribe((resp: any) => {
      this.listCategories = resp.data;
    })
  }

  deleteCategories(id: number) {
    this.categoriesService.deleteCategories({
      "id":id
    }).subscribe((resp: any) => {
      if (resp.rc) {
        this.flag = resp.rc;
        this.message = resp.msg;
        this.hideModal(id);
        this.loadListCategories();
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