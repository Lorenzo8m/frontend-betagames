import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-editors-card',
  standalone: false,
  templateUrl: './editors-card.component.html',
  styleUrl: './editors-card.component.scss'
})
export class EditorsCardComponent {

  constructor(private editorsService: ApiService) { }

  listEditors: any[] = [];
  

  loadListEditors() {
    this.editorsService.listEditors().subscribe((resp: any) => {
      this.listEditors = resp.data;
    });
  }

  ngOnInit() {
    this.loadListEditors();
  }


}
