import { Component, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-categories-update-modal',
  standalone: false,
  templateUrl: './categories-update-modal.component.html',
  styleUrl: './categories-update-modal.component.scss'
})
export class CategoriesUpdateModalComponent {

  @Input() categoriesData!: any;
  @ViewChild("categoriesUpdate") categoryUpdate!: any;

  constructor(private categoriesService: ApiService) { }

  flag: boolean | null = null;
  message: string = ""
  listCategories: any[] = [];


    loadListCategories() {
      this.categoriesService.listCategories().subscribe((resp: any) => {
        this.listCategories = resp.data;
      })
  }
  
  updateCategories(id:number) {
    this.categoriesService.updateCategories({
        "id" : id,
        "name": this.categoryUpdate.nativeElement[0].value,
    }).subscribe((resp:any) => {
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
      let modalElement = document.getElementById(`staticBackdrop${id}`); 
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
