import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private games:ApiService,
  ){}

  listGames: any;

  ngOnInit(): void {
    this.games.listGames().subscribe((resp:any)=>{
      this.listGames = resp.data;
    })
  }

}
