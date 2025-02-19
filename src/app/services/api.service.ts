import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  url = 'http://localhost:8080/rest/';

  constructor(private http: HttpClient) {}

  //=======GAMES==================

  listGames(){
    return this.http.get(this.url + "public/games/list")
  }
  createGames(body: {}){
    return this.http.post(this.url + "admin/games/create", body)
  }
  updateGames(body: {}){
    return this.http.post(this.url + "admin/games/update", body)
  }
  deleteGames(body: {}){
    return this.http.post(this.url + "admin/games/delete", body)
  }
  searchByTyping(params: any): Observable<any> {
    let httpParams = new HttpParams();
    // Aggiungi i parametri solo se sono presenti
    if (params.name)            httpParams = httpParams.set('name', params.name);
    if (params.authorsId)       httpParams = httpParams.set('authorsId', params.authorsId.toString()); // con conversioen in stringa che poi vedremo se necessaria
    if (params.categoriesId)    httpParams = httpParams.set('categoriesId', params.categoriesId.toString());
    if (params.editorId)        httpParams = httpParams.set('editorId', params.editorId.toString());
    return this.http.get(this.url + "public/games/searchByTyping", { params: httpParams });
  }
  //=======DETAILS CART==================
  listDetailsCart() {
    return this.http.get(this.url + 'detailsCarts/list');
  }

  listByCart(id: number){
    return this.http.get(this.url + "detailsCarts/listByCarts?id=" + id)
  }
  deleteAllByCart(body: {}){
    return this.http.post(this.url + "detailsCarts/deleteAllByCart", body)
  }
  deleteDetailsCart(body: {}) {
    return this.http.post(this.url + 'detailsCarts/delete', body);
  }

  createDetailsCart(body: {}) {
    return this.http.post(this.url + "detailsCarts/create", body)
  }
  updateDetailsCart(body: {}){
    return this.http.post(this.url + "detailsCarts/update", body)
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
    return this.http.get(this.url + "admin/users/searchByTyping");}//Ricordare a prendere ID

  deleteUser(body:{}){
    return this.http.post(this.url +"user/users/delete", body);
  }
  
  //=======ORDER==================
  createOrder(body: {}){
    return this.http.post(this.url + "orders/createOrders", body)
  }

  //=======CATEGORIES==================
  listCategories(){
    return this.http.get(this.url + "public/categories/list")
  }
}
