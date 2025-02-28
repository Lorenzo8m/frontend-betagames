import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-editor-update-modal',
  standalone: false,
  templateUrl: './editor-update-modal.component.html',
  styleUrl: './editor-update-modal.component.scss',
})
export class EditorUpdateModalComponent {
  @Output() updateListEditor: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() editorData!: any;
  @ViewChild('editorUpdate') editorUpdate!: ElementRef;
  flag: boolean | null = null;
  message: string = '';
  listEditors: any[] = [];

  constructor(private editorsService: ApiService) {}
  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
      this.updateListEditor.emit(this.listEditors);
    });
  }

  saveModifyEditors(id: number) {
    this.editorsService
      .updateEditors({
        id: id,
        name: this.editorUpdate.nativeElement[0].value,
        website: this.editorUpdate.nativeElement[1].value,
      })
      .subscribe((resp: any) => {
        if (resp.rc) {
          this.flag = resp.rc;
          this.message = resp.msg;
          this.hideModal(id);
          this.loadListEditors();
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
