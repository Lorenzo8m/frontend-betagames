import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="http://localhost:8080/rest/";

  constructor(private http:HttpClient) { }

  //=======GAMES==================
  listGames(){
    return this.http.get(this.url + "games/list")
  }
  createGames(body: {}){
    return this.http.post(this.url + "games/create", body)
  }
  updateGames(body: {}){
    return this.http.post(this.url + "games/update", body)
  }
  deleteGames(body: {}){
    return this.http.post(this.url + "games/delete", body)
  }
  //=======DETAILS CART==================
  listDetailsCart(){
    return this.http.get(this.url + "detailsCarts/list")
  }
  listByCart(id: number){
    return this.http.get(this.url + "detailsCarts/listByCarts?id=" + id)
  }
  createDetailsCart(body: {}) {
    return this.http.post(this.url + "detailsCarts/create", body)
  }
  updateDetailsCart(body: {}){
    return this.http.post(this.url + "detailsCarts/update", body)
  }
  deleteDetailsCart(body: {}){
    return this.http.post(this.url + "detailsCarts/delete", body)
  }
  deleteAllByCart(body: {}){
    return this.http.post(this.url + "detailsCarts/deleteAllByCart", body)
  }
  //=======ORDER==================
  createOrder(body: {}){
    return this.http.post(this.url + "orders/createOrders", body)
  }

}
