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
  listGamesById(id: number){
    return this.http.get(this.url + "public/games/listById?id=" + id)
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
  searchByTypingGames(params: any): Observable<any> {
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
    return this.http.get(this.url + 'admin/detailsCarts/list');
  }
  listByCart(id: number){
    return this.http.get(this.url + "user/detailsCarts/listByCarts?id=" + id)
  }
  createDetailsCart(body: {}) {
    return this.http.post(this.url + "user/detailsCarts/create", body)
  }
  updateDetailsCart(body: {}){
    return this.http.post(this.url + "user/detailsCarts/update", body)
  }
  deleteDetailsCart(body: {}) {
    return this.http.post(this.url + 'user/detailsCarts/delete', body);
  }
  deleteAllByCart(body: {}){
    return this.http.post(this.url + "user/detailsCarts/deleteAllByCart", body)
  }

  //=======Ordini==================
  listOrdini() {
    return this.http.get(this.url + 'admin/orders/allOrders');
  }
  deleteOrdini(body: {}) {
    return this.http.post(this.url + 'orders/deleteOrders', body);
  }
  updateOrders(body: {}) {
    return this.http.post(this.url + "admin/orders/updateOrders",body)
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
    return this.http.get(this.url + "admin/users/searchByTyping?id="+id);
  }

  deleteUser(body:{}){
    return this.http.post(this.url +"user/users/delete", body);
  }

  createUser(body:{}){
    return this.http.post(this.url + "public/users/createUser", body)
  }

  login(body:{}){
    return this.http.post(this.url + "public/users/login", body)
  }

  //=======ORDER==================
  createOrder(body: {}){
    return this.http.post(this.url + "orders/createOrders", body)
  }
  listOrder() {
    return this.http.get(this.url + "admin/orders/allOrders");
  }
  searchByTypingOrder(id:number) {
    return this.http.get(this.url + "admin/orders/searchByTyping?id=" + id);
  }
  //=======USER=========
  listUser() {
    return this.http.get(this.url + "admin/users/list");
  }
  updateUser(body:{}) {
    return this.http.post(this.url + "users/update",body)
  }
  SearchByTypingUser(id: number) {
    return this.http.get(this.url + "admin/users/searchByTyping?id="+id + "&active=true")
  }
  //======EDITORS======
  listEditors() {
    return this.http.get(this.url + "public/editors/list");
  }

  createEditors(body: {}) {
    return this.http.post(this.url + "admin/editors/create", body);
  }

  updateEditors(body: {}) {
    return this.http.post(this.url + "admin/editors/update", body);
  }

  deleteEditors(body: {}) {
    return this.http.post(this.url + "admin/editors/delete", body);
  }
  //======AUTHORS======
  listAuthors() {
    return this.http.get(this.url + "public/authors/list");
  }
  createAuthors(body: {}) {
    return this.http.post(this.url + "admin/authors/create",body)
  }
  updateAuthors(body: {}) {
    return this.http.post(this.url + "admin/authors/update", body);
  }
  deleteAuthors(body: {}) {
    return this.http.post(this.url + "admin/authors/delete", body);
  }
  //=======CATEGORIES==================
  listCategories(){
    return this.http.get(this.url + "public/categories/list")
  }

}//class
