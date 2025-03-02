import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-shipping',
  standalone: false,
  templateUrl: './details-shipping.component.html',
  styleUrl: './details-shipping.component.scss',
})
export class DetailsShippingComponent {
  listUser: any[] = [];
  rc: any;
  msg = '';

  constructor(private service: ApiService, private router: Router) {}

  loadListInfo(): void {
    const id = localStorage.getItem('idUser');
    if (id !== null) {
      const numericId = parseInt(id);
      console.log('cart', numericId, typeof numericId);
      this.service.listInfoUsersById(numericId).subscribe((r: any) => {
        this.listUser = r.data;
      });
    }
  }

  ngOnInit(): void {
    this.loadListInfo();
  }

  onDelete(body: {}) {
    if (
      confirm(
        'Are you sure you want to delete your details shipping? This action cannot be undone.'
      )
    ) {
      this.service.deleteDetailShippingById(body).subscribe((resp: any) => {
        this.loadListInfo();
        if (resp.rc) {
          this.rc = resp.rc;
          this.msg = resp.msg;
          this.router.navigate(['ordini']);
          console.log(this.msg);
        } else {
          this.rc = resp.rc;
          this.msg = resp.msg;
          console.log(this.msg);
        }
      });
    }
  }

  hasActiveUsers(): boolean {
    return (
      this.listUser &&
      Array.isArray(this.listUser) &&
      this.listUser.some((user) => user.active)
    );
  }

  hasActiveDetails(detailsShipping: any[]): boolean {
    return detailsShipping.some(detail => detail.active);
  }
  
}
