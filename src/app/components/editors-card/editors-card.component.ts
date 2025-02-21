import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-editors-card',
  standalone: false,
  templateUrl: './editors-card.component.html',
  styleUrl: './editors-card.component.scss'
})
export class EditorsCardComponent {

  name: string = "";
  website: string = "";
  editorName: string="";
  editorWebsite: string="";

  constructor(private editorsService: ApiService) { }

  listEditors: any[] = [];

  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
    });
  }

  createEditors(name:string, website:string) {
    this.editorsService.createEditors({
      "name": name,
      "website":website
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListEditors();
    })
  }

  saveModifyEditors(id: number, name: string, website: string) {
    this.editorsService.updateEditors({
      "id" : id,
      "name" : name,
      "website" : website
    }).subscribe((resp:any) => {
      this.loadListEditors();
    })
  }

  deleteEditors(id: number) {
    this.editorsService.deleteEditors({
      "id":id
    }).subscribe((resp: any) => {
      console.log(resp);
      this.loadListEditors();
    })
  }

  ngOnInit() {
    this.loadListEditors();
  }
}
