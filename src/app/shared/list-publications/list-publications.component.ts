import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrls: ['./list-publications.component.css']
})
export class ListPublicationsComponent implements OnInit {

  constructor(private youtubeService: YoutubeService) { }

  videos: any[] = ["1", "2"];

  test: any = "hello";


  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide()
    // }, 3000

    // )
    this.videos = [];
    this.youtubeService.getVideosFromChannel('UCdQuSklyXrfjOdqJ0wHqBng', 15)
    .subscribe(list => {
      // this.videos.push(list);
      this.videos = list.items;
      console.log(list.items);
      // console.log(list);
      // list.forEach(element => {
      //   this.videos.push(element)
      // });
    })
  }


}
