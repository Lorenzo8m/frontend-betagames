import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('listGroup') listGroup!: ElementRef;//Ottiene un riferimento all'elemento <ul> con la classe list-group

  ngOnInit(): void {
    this.games.listGames().subscribe((resp:any)=>{
      this.listGames = resp.data;
    })
  }//ngOnInit

  scrollLeft() {
    this.listGroup.nativeElement.scrollLeft -= 150; //La card è larga 250px
  }//scrollLeft

  scrollRight() {
    this.listGroup.nativeElement.scrollLeft += 150;
  }//scrollRight



}
