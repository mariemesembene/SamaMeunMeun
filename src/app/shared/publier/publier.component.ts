import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PublicationService } from 'src/app/core/services/publication.service';

@Component({
  selector: 'app-publier',
  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css']
})
export class PublierComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private publicationService: PublicationService) { }

  description = new FormControl();

  ngOnInit(): void {
  }
  files: File[] = [];
  fichier;
  publierForm: FormGroup;
  selectedFiles;



  onSelect(event) {

    console.log(event);
    if(this.files.length==0){
      this.files.push(...event.addedFiles);
    }
    else{
      console.log(event.addedFiles[0])
      this.files[0]=event.addedFiles[0]  
     


    }

    this.selectedFiles = null;
    this.readFile();

  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  initForm()
  {
    this.publierForm = this.formBuilder.group({
      "description": [{ value: '', disabled: true }],
    })
  }

  publish()
  {

    this.publicationService.publierVideo(this.description.value, this.selectedFiles).subscribe(
      (data)=>
      {
        console.log(data)
      },
      (error) => console.log(error)
    )

  }


   // fonction pour lire les photos choisies
   readFile() {
    this.files.forEach(photo => {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFiles = e.target.result;
      }
      reader.readAsDataURL(photo);
    })

  }



}
