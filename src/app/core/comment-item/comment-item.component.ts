import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() commentaire: any;
  // le deuxieme argument de la fonction showReplyInput
  @Input() secondArg: any;
  @Input() isShowComments: boolean;
  @Input() video: any;

  // NB :
  // sur les fonctons top level commentaire: =  commentaire.snippet.topLevelComment, secondArg=null
  // second niveau: commentaire = reply.snippet, secondArg=reply.snippet.authorDisplayName
  // meme video
  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    this.expandTextarea('txtarea');
  }

// fonction pour la hauteur automatique du textarea de commentaire
  expandTextarea(id: string) {
    document.getElementById(id).addEventListener('keyup', function() 
    {
        this.style.overflow = 'hidden';
        this.style.height = '0';
        this.style.height = this.scrollHeight + 'px';
    }, false);
  }

  // fonction permettant d'afficher les champs de réponse d'un commentaire
  showReplyInput(commentaire: any, authorToReplayName: string){
    commentaire["isShownReplyInput"] = true;
    if(authorToReplayName){
      commentaire["control"] = new FormControl(authorToReplayName);
    }else{
      commentaire["control"] = new FormControl(''); 
    }
  }

    // fonction permettant de réponde à un commentaire
  replyComment(video, commentaire){
    this.youtubeService.reply(commentaire['control'].value, video.id.videoId, commentaire.id).subscribe(
      (success)=>{
        // this.loadSpinner.next(commentaire.id); => faut le déplacer dans le service
        console.log(success);
        setTimeout(() => {
          commentaire.totalReplyCount=+1;
          commentaire.replies.comments.splice(0,0,success);
          // video.commentaires.items.splice(0,0,success);

        }, 3000);
        
      },
      (error)=>{console.log(error)},
      ()=>{
        setTimeout(() => {
          // this.loadSpinner.next(null)
        }, 3000);
      }
    )
  }

  start : 0;
  end = 2;
  showMore(){
    this.end = this.end + 2;
  }



}
