import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

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

  constructor(private service: ApiService) {}

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
  }

  hasActiveUsers(): boolean {
    return (
      this.listUser &&
      Array.isArray(this.listUser) &&
      this.listUser.some((user) => user.active)
    );
  }
}
