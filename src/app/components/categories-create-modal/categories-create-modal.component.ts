import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-categories-create-modal',
  standalone: false,
  templateUrl: './categories-create-modal.component.html',
  styleUrl: './categories-create-modal.component.scss'
})
export class CategoriesCreateModalComponent {

   @ViewChild("categoryCreate") categoryCreate!: ElementRef;
  
  constructor(private categoriesService: ApiService) { }

  flag: boolean | null = null;
  message: string = ""
  listCategories: any[] = [];


    loadListCategories() {
      this.categoriesService.listCategories().subscribe((resp: any) => {
        this.listCategories = resp.data;
      })
  }
  
  createCategory() {
    this.categoriesService.createCategories({
      "name": this.categoryCreate.nativeElement[0].value
    }).subscribe((resp: any) => {
        this.flag = resp.rc;
        this.message = resp.msg;
      if (resp.rc) {
        this.hideModal();
        this.loadListCategories();
      } else {
        this.hideFlag();
      }
    })
  }

    hideModal(): void {
    setTimeout(() => {
      this.flag = null;
      let modalElement = document.getElementById(`createModal`); 
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