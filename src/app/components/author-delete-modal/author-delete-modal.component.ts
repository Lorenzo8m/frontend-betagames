import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;
@Component({
  selector: 'app-author-delete-modal',
  standalone: false,
  templateUrl: './author-delete-modal.component.html',
  styleUrl: './author-delete-modal.component.scss',
})
export class AuthorDeleteModalComponent {
  @Output() updateListAuthor: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() authorData!: any;

  constructor(private authorsService: ApiService) {}

  flag: boolean | null = null;
  message: string = '';
  listAuthors: any[] = [];

  loadListAuthors() {
    this.authorsService.listAuthors().subscribe((resp: any) => {
      this.listAuthors = resp.data;
      this.updateListAuthor.emit(this.listAuthors);
    });
  }

  deleteAuthors(id: number) {
    console.log('sono stato chiamto');
    console.log('id: ' + id);
    this.authorsService
      .deleteAuthors({
        id: id,
      })
      .subscribe((resp: any) => {
        if (resp.rc) {
          this.flag = resp.rc;
          this.message = resp.msg;
          this.hideModal(id);
          this.loadListAuthors();
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
      document.querySelectorAll('.modal-backdrop')
        .forEach((el) => el.remove());

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
