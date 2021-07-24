import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isShownMyProfil: boolean = true;
  isShownSettings: boolean = false;

  showMyProfil(){
    this.isShownMyProfil = true;
    this.isShownSettings = false
  }

  showSettings(){
    this.isShownMyProfil = false;
    this.isShownSettings = true
  }

}
