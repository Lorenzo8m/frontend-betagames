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
    return this.http.get(this.url + "rest/public/games/list")
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
  listOrder() {
    return this.http.get(this.url + "admin/orders/allOrders");
  }
  searchByTyping(id:number) {
    return this.http.get(this.url + "admin/orders/searchByTyping?id=" + id);
  }
  //=======USER=========
  listUser() {
    return this.http.get(this.url + "users/list");
  }
  updateUser(body:{}) {
    return this.http.post(this.url + "users/update",body)
  }
  deleteUser(body: {}) {
    return this.http.post(this.url + "users/delete", body);
  }
  userSearchByTyping(id: number) {
    return this.http.get(this.url + "users/searchByTyping?id="+id + "&active=true")
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
}
