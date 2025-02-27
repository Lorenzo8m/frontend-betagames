import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-detail-modal',
  standalone: false,
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss'
})
export class DetailModalComponent {

  @Input() order: any;
  listUser:any[]=[];

    constructor(
      private service: ApiService,
      @Inject(PLATFORM_ID) private platformId: object
    ) {}
    

    ngOnInit(): void {
      this.loadListInfo();
    }

    loadListInfo(): void {
      if (isPlatformBrowser(this.platformId)) {
        const id = localStorage.getItem('idUser');
        if (id !== null) {
          const numericId = parseInt(id);
          console.log('cart', numericId, typeof numericId);
          this.service.listInfoUsersById(numericId).subscribe((r: any) => {
            this.listUser = r.data;
          });
        }
      }
    }
}
