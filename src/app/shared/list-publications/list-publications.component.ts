import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Comment } from 'src/app/core/models/Comment';
import { TopLevelComment } from 'src/app/core/models/TopLevelComment';
import { Video } from 'src/app/core/models/Video';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrls: ['./list-publications.component.css']
})
export class ListPublicationsComponent implements OnInit {

  constructor(private youtubeService: YoutubeService) { }

  commentControl = new FormControl('');
  replyControl = new FormControl('');
  videos: Video[];
  isCommentsShown = false;
  test = new FormControl();

  // tableau contenant la liste des commentaires
  // si le parent-comment-id est null, ça veut dire le commentaire est un
  // commentaire principal
  comments: Comment[];

  // test: any = "hello";


  isShowComments = false;
  
  listVideosId: string;



  ngOnInit(): void {

    // code
    // const tag = document.createElement('script');
    // tag.src = 'https://www.youtube.com/iframe_api';
    // document.body.appendChild(tag);

    // this.getVideos();

    // code



    
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide()
    // }, 3000

    // )

    // debut code
    // this.videos = [];


    // fin code
  }

  // fonction permettant de récupérer les vidéos
  getVideos(){
    this.youtubeService.getVideosFromChannel(15)
    .subscribe(list => {
      console.log(list)
      // this.videos.push(list);
      this.videos = list.items;
      
      // console.log(this.videos);

      if(this.videos.length>0){
         this.listVideosId=this.videos[0].id.videoId;
        for (let index = 1; index < this.videos.length; index++) {
          if(this.videos[index]){
            this.listVideosId=this.listVideosId.concat(',', this.videos[index].id.videoId);
          }
        }
      }

      // on récupére les statistiques de chaque video
      this.getStatisticsOfVideos();

      console.log(this.videos);

      this.verifyIfUserLikeVideos();
      console.log("after verif");
      console.log(this.videos);
    })
  }

  // on récupère les statistiques de chaque video
  getStatisticsOfVideos(){
    this.youtubeService.getVideoStatistics(this.listVideosId).subscribe(
      (statistics:any)=>{
        console.log("statistics success");
        console.log(statistics);
        console.log(this.videos);
        for (let index = 0; index < this.videos.length; index++) {
          // const element = array[index];
          console.log(index);
          this.videos[index].statistics = statistics.items[index].statistics;
        }

      },
      (error)=>{
        console.log("statics error");
        console.log(error);
      }
    )
  }

  // fonction permettant de commenter ou de lister les commentaires
  comment(){
    this.isShowComments = !this.isShowComments;
  }

  start : 0;
  end = 2;
  showMore(){
    this.end = this.end + 2;
  }

   loadSpinner: BehaviorSubject<any>  = new BehaviorSubject(null);
   loadReplySpinner: BehaviorSubject<string> = new BehaviorSubject(null);

  // fonction permettant de commenter une video
  commentVideo(video: Video){
    // console.log(videoId)
    this.loadSpinner.next(video.id.videoId);
    this.youtubeService.postComment(this.commentControl.value, video.id.videoId).subscribe(
      (success)=>{
        console.log(success)
        // linkdin avant de mettre le commentaire dans le tableau 

        // for (let index = 0; index < video.commentaires.items.length+1; index++) {
        //   // const element = array[index];
        //   video.commentaires.items[index+1] = video.commentaires.items[index];
        // }
        // video.commentaires.items[0](success);
        setTimeout(() => {
          video.commentaires.items.splice(0,0,success);
        }, 3000);
        console.log("commentaires now");
        console.log(video.commentaires)
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        setTimeout(() => {
          this.loadSpinner.next(null)
        }, 3000);
        this.commentControl.setValue('');
      }
    )
  }

  // fonction permettant d'afficher les commentaires d'une video
  showComments(video: Video){
    this.youtubeService.getCommentsOfVideo(video.id.videoId).subscribe(
      data => {
        // console.log(data)
        video["commentaires"] = data;
        video["isShowComments"] = true;

        console.log(video);
      },
      error => console.log(error)
    )
  }


  showReplyInput(commentaire: TopLevelComment, authorToReplayName: string){
    commentaire["isShownReplyInput"] = true;
    if(authorToReplayName){
      commentaire["control"] = new FormControl(authorToReplayName);
      // span.innerHTML = 
      //     '<b>' + 
      //     inp.value.substr(0, 3) + 
      //     '</b>' + 
      //     inp.value.substr(3);
    }else{
      commentaire["control"] = new FormControl(''); 
    }
  }

  // fonction permettant de réponde à un commentaire
  replyComment(video: Video, commentaire: TopLevelComment){
    this.youtubeService.reply(commentaire['control'].value, video.id.videoId, commentaire.id).subscribe(
      (success: any)=>{
        this.loadSpinner.next(commentaire.id);
        console.log(success);
        setTimeout(() => {
          console.log("comment successful");
          console.log(success);
          commentaire.snippet.totalReplyCount=+1;
          commentaire.replies.comments.splice(0,0,success);
          // video.commentaires.items.splice(0,0,success);

        }, 3000);
        
      },
      (error)=>{console.log(error)},
      ()=>{
        setTimeout(() => {
          this.loadSpinner.next(null)
        }, 3000);
      }
    )
  }

  // aimer une vidéo
  likeVideo(video: Video){
    this.youtubeService.likeVideo(video).subscribe(
      (success)=>{
        console.log(success);
        // on incrémente le nombre de likes
        video.statistics.likeCount=video.statistics.likeCount+1;
        // this.youtubeService.updateVideoLikeCount(video).subscribe(
        //   (response)=>{
        //     console.log("update like");
        //     console.log(response);
        //   },
        //   (error)=>{console.log(error)}
        // )
      },
      (error)=>{console.log(error)}
    )
  }

  // foncton permettant de verifier les videos aimés par le user connecté
  verifyIfUserLikeVideos(){
    this.youtubeService.verifyUserLike(this.listVideosId).subscribe(
      (data)=>{
        for (let index = 0; index < this.videos.length; index++) {
          // const element = array[index];
          console.log(index);
          this.videos[index].isUserLiked = data.items[index].rating;
        }
      },
      error=>console.log(error)
    )
  }










}
