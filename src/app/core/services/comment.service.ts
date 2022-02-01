import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { likeComment } from '../models/LikeComment';
import { Reply } from '../models/Reply';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

    // fonction permettant de recupérer un comment d'une video ainsi que ses likes
    getOneCommentOfVideo(id_video: number, id_comment: number): Observable<likeComment[]>
    {
      return this.http.get<likeComment[]>(environment.apiUrl+"/videos/"+id_video+"/comments/"+id_comment+"/likecomments");
    }

    // fontion permettant de poster un commentaire
    postComment(videoId: string, displayText: string, user_id: number)
    {
      const body=
      {
        "displayText": displayText,
           "video":{
               "videoId": videoId,
               "user": {
                   "id": user_id
               }
           }
       };
      return this.http.post(environment.apiUrl+"/comments", body);
    }

    // PUT comment
    updateComment(id_comment: number, displayText: string): Observable<Comment>{
      const body = {
        "displayText": displayText
      }
      return this.http.put<Comment>(environment.apiUrl+"/comments/"+id_comment, body);
    }

    // DELETE comment
    deleteComment(id_comment: number)
    {
      this.http.delete(environment.apiUrl+"/comments"+id_comment)
    }


    // récuperer les replies d'un comment (d'une video) et leurs likes
    getCommentsAndReply(id_video: number,id_comment: number,id_reply: number){
      return this.http.get<likeComment[]>(environment.apiUrl+"/videos/"+id_video+"/comments/"+id_comment+"/replies/"+id_reply+"/likecomments");
    }
    
    // aimer/annnuler un jaime : commentaire
    likeComment(id_comment: number): Observable<likeComment>
    {
      const body =
      {
        "comment": {
            "id":id_comment
        }
      }

    return this.http.post<likeComment>(environment.apiUrl+'/likeComments', body);
    }


    // les commentaires d'une video
    getCommentsOfVideo(id_video: number): Observable<Comment[]>{
      return this.http.get<Comment[]>(environment.apiUrl+"/videos/"+id_video+"/comments/");
    }

    // les replies d'un comment
    getReplyOfComment(id_comment: number): Observable<Reply[]>{
      return this.http.get<Reply[]>(environment.apiUrl+"/comments/"+id_comment+"/replies/");
    }


    // get comments byVideoId
    getCommentsByVideoId(videoId: string): Observable<Comment[]>{
      return this.http.get<Comment[]>(environment.apiUrl+"/comments/publication/"+videoId);
    }

    // nombre de commentaires d'une video
    getVideoNumberComments(videoId: string):Observable<any>{
      return this.http.get<any>(environment.apiUrl+"/count/comments/video/"+videoId);
    }
 
}
