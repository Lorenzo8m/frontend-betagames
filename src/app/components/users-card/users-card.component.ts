import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-card',
  standalone: false,
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss'
})
export class UsersCardComponent {



  username: string="";

  email: string = "";
searchQuery: any;

  constructor(private userService: ApiService) { }
  
  listUser: any[] = []

  loadListUsers() {
    this.userService.listUser().subscribe((resp: any) => {
      this.listUser = resp.data;
    })
  }
  updateUser(id:number, username: string, email: string) {
    this.userService.updateUser({
        "id" : id,
        "username" : username,
        "email" : email,
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListUsers();
    })
  }
  onSearch() {
    this.userService.SearchByTypingUser(this.searchQuery).subscribe((resp: any) => {
      this.listUser = resp.data;
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser({
      "id":id
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListUsers();
    })
  }
  ngOnInit() {
    this.loadListUsers();
  }

  getRoleClass(role: string): string {
    if (role.toLocaleLowerCase() === "admin") {
          return "bg-danger"
    }
    else if (role.toLocaleLowerCase() === "user") {
      return "bg-success"
    }
    else {
      return "bg-warning"
    }
  }
}
