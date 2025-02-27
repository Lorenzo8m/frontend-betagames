import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-games-user',
  standalone: false,
  templateUrl: './games-user.component.html',
  styleUrl: './games-user.component.scss',
})
export class GamesUserComponent implements OnInit {
  constructor(
    private service: ApiService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.loadListInfo();
  }

  listUser: any[] = [];
  rc: any;
  msg = '';
  uniqueGames: any[] = [];
  userId: number = 0;
  userData: any = null;

  loadListInfo(): void {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('idUser');
      if (id !== null) {
        const numericId = parseInt(id);
        console.log('cart', numericId, typeof numericId);
        this.service.listInfoUsersById(numericId).subscribe((r: any) => {
          this.listUser = r.data;
          if (this.listUser.length > 0) {
            this.userData = this.listUser[0]; // ✅ Guarda los datos del usuario
            this.uniqueGames = this.getUniqueGames(this.userData); // ✅ Calcula una sola vez
          }
        });
      }
    }
  }

  getUniqueGames(user: any): any[] {
    console.log('Procesando juegos únicos para el usuario:', user);

    const uniqueGamesMap = new Map<number, any>();

    user.listOrdersDTO.forEach((order: any) => {
      order.listDetailsOrderDTO.forEach((detail: any) => {
        const gameId = detail.gameDTO.id;

        if (!uniqueGamesMap.has(gameId)) {
          uniqueGamesMap.set(gameId, {
            ...detail,
            totalQuantity: detail.quantity,
            totalPrice: detail.priceAtTime,
          });
        } else {
          const existingGame = uniqueGamesMap.get(gameId);
          existingGame.totalQuantity += detail.quantity;
          existingGame.totalPrice += detail.priceAtTime;
        }
      });
    });

    const uniqueGames = Array.from(uniqueGamesMap.values());
    console.log('Juegos únicos calculados:', uniqueGames);
    return uniqueGames;
  }

  trackByGameId(index: number, detail: any): number {
    return detail.gameDTO.id;
  }

  onDelete(body: {}) {
    this.service.deleteUser(body).subscribe((resp: any) => {
      this.loadListInfo();
      if (resp.rc) {
        this.rc = resp.rc;
        this.msg = resp.msg;
        console.log(this.msg);
      } else {
        this.rc = resp.rc;
        this.msg = resp.msg;
        console.log(this.msg);
      }
    });
  }
  hasActiveUsers(): boolean {
    return (
      this.listUser &&
      Array.isArray(this.listUser) &&
      this.listUser.some((user) => user.active)
    );
  }
}
