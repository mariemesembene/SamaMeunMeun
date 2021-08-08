import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})
export class PublierComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  files: File[] = [];

onSelect(event) {
  console.log(event);
  if(this.files.length==0){
    this.files.push(...event.addedFiles);
  }
  else{
   
    console.log(event.addedFiles[0])
    this.files[0]=event.addedFiles[0]  
  }

}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}


}
