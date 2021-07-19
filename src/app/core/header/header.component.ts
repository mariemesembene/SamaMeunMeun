import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  showProfilPanel: boolean = false;

  showProfilDetails(){
    this.showProfilPanel = true;
  }

 

  ngOnInit(): void {
    
  }

  closeProfilPanel(){
    this.showProfilPanel = false;
  }

 

}
