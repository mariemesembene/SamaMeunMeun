import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Comment } from 'src/app/core/models/Comment';
import { Publication } from 'src/app/core/models/Publication';
import { TopLevelComment } from 'src/app/core/models/TopLevelComment';
import { Video } from 'src/app/core/models/Video';
import { CommentService } from 'src/app/core/services/comment.service';
import { PublicationService } from 'src/app/core/services/publication.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrls: ['./list-publications.component.css']
})
export class ListPublicationsComponent implements OnInit {

  constructor(private youtubeService: YoutubeService,
    private commentService: CommentService,
    private publicationService: PublicationService,
    private replyService: ReplyService,
    private router: Router,
  ) { }

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

    // this.likeService.getVideoLikes(2).subscribe(
    //   (s)=> console.log(s),
    //   (e) => console.log(e)
    // )

    // code
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.getVideos();


    // this.youtubeService.testMockUrl().subscribe(
    //   (s)=>console.log(s),
    //   (e)=>console.log(e)
    // )

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
  getVideos() {
    this.youtubeService.getVideosFromChannel(15)
      .subscribe(
        list => {
          console.log("list");
          // this.videos.push(list);
          this.videos = list.items;

          console.log("length");
          console.log(this.videos.length);

          // console.log(this.videos);

          if (this.videos.length > 0) {
            console.log(this.videos);
            // récupérer le nombre de commentaire de chaque video
            this.listVideosId = this.videos[0].id.videoId;
            for (let index = 1; index < this.videos.length; index++) {
              if (this.videos[index]) {
                this.listVideosId = this.listVideosId.concat(',', this.videos[index].id.videoId);
              }
            }

            this.videos.forEach(video => {
              video['nbreReactions'] = 0;

              // on récupère les commentaires de chaque vidéo
              this.commentService.getVideoNumberComments(video['id']['videoId']).subscribe(
                (nbreComments) => {
                  console.log("comts");
                  console.log(nbreComments);
                  video['nbreReactions'] = video['nbreReactions'] + parseInt(nbreComments);
                },
                (error) => {
                  console.log("error getting nbre comments");
                  console.log(error)
                }
              );

              // récuperer les id de cahque video et ensuite ces jaimes
              console.log(video['id']['videoId']);

              this.publicationService.getVideoByVideoId(video['id']['videoId']).subscribe(
                (vid) => {
                  // on récupère les likes
                  console.log(vid);
                  this.publicationService.getVideoLikes(vid["id"]).subscribe(
                    (likes) => {
                      console.log(likes);
                      video["likes"] = likes;
                      video['nbreLikes'] = likes.length;
                    },
                    (error) => {
                      console.log(error)
                    }
                  )
                },
                (error) => {
                  console.log(error)
                }
              )

              // récupérer le nombre de replies
              this.publicationService.getRepliesOfVideo(video['id']['videoId']).subscribe(
                (nombreReplies) => {
                  console.log("get replies");
                  console.log(nombreReplies);
                  video["nbrReplies"] = nombreReplies
                  video['nbreReactions'] = video['nbreReactions'] + parseInt(nombreReplies);

                },
                (error) => console.log(error)
              )

              // alert(video['nbreReactions']);

              // video['nbreReactions'] = video["nbrReplies"];
              // alert(test);

              // on teste si le user connecté a aimé la vidéo ou pas
              this.publicationService.isVideoLiked(1, video.id.videoId).subscribe(
                (response)=>{
                  console.log(response);
                  if(response==true){
                    video["isLiked"]=true;
                  }
                }
              )
            });



          }

          // on récupére les statistiques de chaque video
          // this.getStatisticsOfVideos();

          // console.log(this.videos);

          // this.verifyIfUserLikeVideos();
          console.log("after verif");
          // console.log(this.videos);
        },
        (error) => {
          console.log("y'a une erreur");
          console.log(error);
        }
      )
  }

  // on récupère les statistiques de chaque video
  getStatisticsOfVideos() {
    this.youtubeService.getVideoStatistics(this.listVideosId).subscribe(
      (statistics: any) => {
        console.log("statistics success");
        console.log(statistics);
        console.log(this.videos);
        for (let index = 0; index < this.videos.length; index++) {
          // const element = array[index];
          console.log(index);
          this.videos[index].statistics = statistics.items[index].statistics;
        }

      },
      (error) => {
        console.log("statics error");
        console.log(error);
      }
    )
  }

  // fonction permettant de commenter ou de lister les commentaires
  comment() {
    this.isShowComments = !this.isShowComments;
  }

  start: 0;
  end = 5;
  showMore() {
    this.end = this.end + 6;
  }

  loadSpinner: BehaviorSubject<any> = new BehaviorSubject(null);
  loadCommentSpinner: BehaviorSubject<any> = new BehaviorSubject(null);
  loadReplySpinner: BehaviorSubject<string> = new BehaviorSubject(null);

  // fonction permettant de commenter une video
  commentVideo(video: Video) {
    // console.log(videoId)
    this.loadSpinner.next(video.id.videoId);
    // on récupère la vidéo par le videoId
    this.publicationService.getVideoByVideoId(video.id.videoId).subscribe(
      (data)=>{
        console.log(data);
        // on post le commentaire sur cette vidéo
        this.commentService.postComment(video.id.videoId, this.commentControl.value,1).subscribe(
          (success)=>{
            console.log(success);
            // setTimeout(() => {
            video['commentaires'].splice(0, 0, success);
            // }, 3000);
          }
        )
      },
      (error)=>{

      },
      () => {
        // setTimeout(() => {
          this.loadSpinner.next(null)
        // }, 3000);
        this.commentControl.setValue('');
      }
      
  
    
    // this.youtubeService.postComment(this.commentControl.value, video.id.videoId).subscribe(
    //   (success) => {
    //     console.log(success)
    //     // linkdin avant de mettre le commentaire dans le tableau 

    //     // for (let index = 0; index < video.commentaires.items.length+1; index++) {
    //     //   // const element = array[index];
    //     //   video.commentaires.items[index+1] = video.commentaires.items[index];
    //     // }
    //     // video.commentaires.items[0](success);
    //     setTimeout(() => {
    //       video.commentaires.items.splice(0, 0, success);
    //     }, 3000);
    //     console.log("commentaires now");
    //     console.log(video.commentaires)
    //   },
    //   (error) => {
    //     console.log(error)
    //   },
    //   () => {
    //     setTimeout(() => {
    //       this.loadSpinner.next(null)
    //     }, 3000);
    //     this.commentControl.setValue('');
    //   }
    )
  }

  // fonction permettant d'afficher les commentaires d'une video
  showComments(video: Video) {
    // on récupère la video à partir de son id

    this.commentService.getCommentsByVideoId(video.id.videoId).subscribe(
      (data) => {
        video["commentaires"] = data;
        video["isShowComments"] = true;
        

        console.log(video);
        // on récupère les replies de chaque video
        data.forEach((element: any) => {
          element['showReplies']=false;
          element['startReply'] = 0;
          element['endReply'] = 5;
          this.commentService.getReplyOfComment(element.id).subscribe(
            (replies)=>{
              element.replies = replies;
            }
          )
        });
      },
      (error) => console.log(error)
    )


    // this.youtubeService.getCommentsOfVideo(video.id.videoId).subscribe(
    //   data => {
    //     // console.log(data)
    //     video["commentaires"] = data;
    //     video["isShowComments"] = true;

    //     console.log(video);
    //   },
    //   error => console.log(error)
    // )
  }


  showReplies(commentaire){
    commentaire["showReplies"] = true;
  }

 
  showMoreReplies(commentaire: Comment){
    commentaire['endReply'] = commentaire['endReply'] + 5;
  }


  showReplyInput(commentaire: Comment, isToAReply: string) {
    commentaire["isShownReplyInput"] = true;
    if (isToAReply) {
      commentaire["control"] = new FormControl(commentaire.user.firstName+' '+commentaire.user.lastName);
      // span.innerHTML = 
      //     '<b>' + 
      //     inp.value.substr(0, 3) + 
      //     '</b>' + 
      //     inp.value.substr(3);
    } else {
      commentaire["control"] = new FormControl('');
    }
  }

  // fonction permettant de réponde à un commentaire
  replyComment(commentaire: Comment) 
  {

    this.replyService.postRepply(commentaire.id, commentaire['control'].value).subscribe(
      {
        next: (reply)=>{
          commentaire['showReplies']=true;
          console.log(reply);
          this.loadCommentSpinner.next(commentaire.id);

          setTimeout(() => {
            commentaire.replies.splice(0, 0, reply);
          }, 3000);

        },
        error: (error) =>{
          console.log(error)
        },
        complete: ()=>{
          setTimeout(() => {
            this.loadCommentSpinner.next(null)
          }, 3000);
          // 
        }
      }
    )
    // this.youtubeService.reply(commentaire['control'].value, video.id.videoId, commentaire.id).subscribe(
    //   (success: any) => {
    //     this.loadSpinner.next(commentaire.id);
    //     console.log(success);
    //     setTimeout(() => {
    //       console.log("comment successful");
    //       console.log(success);
    //       commentaire.snippet.totalReplyCount = +1;
    //       commentaire.replies.comments.splice(0, 0, success);
    //       // video.commentaires.items.splice(0,0,success);

    //     }, 3000);

    //   },
    //   (error) => { console.log(error) },
    //   () => {
    //     setTimeout(() => {
    //       this.loadSpinner.next(null)
    //     }, 3000);
    //   }
    // )

  }

  // aimer une vidéo
  likeVideo(videoId, rate, userEmail) {
    this.youtubeService.likeVideo(videoId, rate, userEmail).subscribe(
      (success) => {
        console.log(success);
        // on incrémente le nombre de likes
        // video.statistics.likeCount=video.statistics.likeCount+1;
      },
      (error) => { console.log(error) }
    )
  }

  // foncton permettant de verifier les videos aimés par le user connecté
  verifyIfUserLikeVideos() {
    // this.publicationService.isVideoLiked(1, )
    // this.youtubeService.verifyUserLike(this.listVideosId).subscribe(
    //   (data) => {
    //     for (let index = 0; index < this.videos.length; index++) {
    //       // const element = array[index];
    //       console.log(index);
    //       this.videos[index].isUserLiked = data.items[index].rating;
    //     }
    //   },
    //   error => console.log(error)
    // )
  }


  viewLikes(video: Publication){
    console.log("test")
    console.log(video['likes'])
    this.router.navigate(["/users-like"], {state: {data: {"users": video["likes"]}}})
  }












}
