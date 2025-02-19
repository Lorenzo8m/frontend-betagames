import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  url = 'http://localhost:8080/rest/';

  constructor(private http: HttpClient) {}

  //=======GAMES==================
  listGames() {
    return this.http.get(this.url + 'public/games/list');
  }
  createGames(body: {}) {
    return this.http.post(this.url + 'games/create', body);
  }
  updateGames(body: {}) {
    return this.http.post(this.url + 'games/update', body);
  }
  deleteGames(body: {}) {
    return this.http.post(this.url + 'games/delete', body);
  }
  //=======DETAILS CART==================
  listDetailsCart() {
    return this.http.get(this.url + 'detailsCarts/list');
  }
  deleteDetailsCart(body: {}) {
    return this.http.post(this.url + 'detailsCarts/delete', body);
  }
  //=======Ordini==================
  listOrdini() {
    return this.http.get(this.url + 'admin/orders/allOrders');
  }
  deleteOrdini(body: {}) {
    return this.http.post(this.url + 'orders/deleteOrders', body);
  }
  listOrderByUser(id:number){
    return this.http.get(this.url + 'user/orders/userOrders?id='+ id);
  }

  //=======PayCard==================
  createPayCard(body:{}){
    return this.http.post(this.url + "user/paycards/create", body);
  }

  //=======User==================
  listInfoUsersById(id:number){
    return this.http.get(this.url + "admin/users/searchByTyping");//Ricordare a prendere ID
  }
}
