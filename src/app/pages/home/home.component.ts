import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private serv:ApiService){}

  listGames: any;
  @ViewChild('listGroup') listGroup!: ElementRef;//Ottiene un riferimento all'elemento <ul> con la classe list-group

  ngOnInit(): void {
    this.loadListGames();
  }//ngOnInit

  loadListGames():void{
    this.serv.listGames().subscribe((resp:any)=>{
      this.listGames = resp.data;
    })
  }//loadListGames

  scrollLeft() {
    const container = this.listGroup.nativeElement;
    container.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }//scrollLeft

  scrollRight() {
    const container = this.listGroup.nativeElement;
    container.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }//scrollRight


}//class