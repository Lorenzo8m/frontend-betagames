import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarOpen:boolean = true;
  activeContent: string = "home";
  openSidebar():void {
    this.isSidebarOpen = true;
  }

  closeSidebar():void {
    this.isSidebarOpen = false;
  }
  setActiveContent(content: string) {
    this.activeContent = content;
  }
}
