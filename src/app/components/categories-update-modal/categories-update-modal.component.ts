import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-categories-update-modal',
  standalone: false,
  templateUrl: './categories-update-modal.component.html',
  styleUrl: './categories-update-modal.component.scss',
})
export class CategoriesUpdateModalComponent {
  @Input() categoriesData!: any;
  @ViewChild('categoriesUpdate') categoryUpdate!: any;
  @Output() updateListCategory: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private categoriesService: ApiService) {}

  flag: boolean | null = null;
  message: string = '';
  listCategories: any[] = [];

  loadListCategories() {
    this.categoriesService.listCategories().subscribe((resp: any) => {
      this.listCategories = resp.data;
      this.updateListCategory.emit(this.listCategories);
    });
  }

  updateCategories(id: number) {
    this.categoriesService
      .updateCategories({
        id: id,
        name: this.categoryUpdate.nativeElement[0].value,
      })
      .subscribe((resp: any) => {
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
      });
  }

  hideModal(id: number): void {
    setTimeout(() => {
      this.flag = null;

      let modalElement = document.getElementById(`deleteStaticBackdrop${id}`);

      if (modalElement) {
        let modalInstance = bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
          modalInstance.hide();
        }

        // Forza la rimozione della classe Bootstrap che blocca la pagina
        modalElement.classList.remove('show');
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.style.display = 'none';
      }

      // Rimuove manualmente eventuali backdrop rimasti
      document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

      // Sblocca lo scrolling della pagina rimuovendo la classe che lo impedisce
      document.body.classList.remove('modal-open');
      document.body.style.overflow = ''; // Riattiva lo scrolling
    }, 500);
  }

  hideFlag(): void {
    setTimeout(() => {
      this.flag = null;
    }, 1000);
  }
}
