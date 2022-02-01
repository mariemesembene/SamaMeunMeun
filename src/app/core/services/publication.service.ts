import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/Like';
import { Publication } from '../models/Publication';
import { Video } from '../models/Video';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PublicationService  {

  constructor(private http: HttpClient) { }


   // récupérer les jaimes d'une video
   getVideoLikes(videoId:number): Observable<Like[]>{
    return this.http.get<Like[]>(environment.apiUrl+"/videos/"+videoId+"/jaimes").
    pipe(
      map(likes => {
        likes =  likes.filter((el:Like) => el.rate="like")
        return likes;
      })
    )
  }

  // publier une video
  publierVideo(description: string, file: File): Observable<Video>
  {
    const body=
    {
      "description": description,
      "file": file,
      "userName": "Fatou"
    }
    return this.http.post<Video>(environment.apiUrl+"/youtube/upload", body);
  }


   // get video byVideoId
   getVideoByVideoId(videoId: string): Observable<Publication>{
    return this.http.get<Publication>(environment.apiUrl+"/publication/"+videoId);
  }

  // recupérer le nbre de replies d'une video
  getRepliesOfVideo(videoId: string): Observable<string>{
    return this.http.get<string>(environment.apiUrl+"/count/replies/video/"+videoId)
  }

    // nombre de likes d'une video
    // getVideoNumberLikes(videoId: string){
    //   return this.http.get<Likes[]>(environment.apiUrl+"/count/comments/video/"+videoId).
    //   pipe(
    //     map(likes => {
    //       return likes.filter((el:Like) => el.rate="like")
    //     })
    //   )
    // }


    // tester si un utilisateur a aimé une video
    isVideoLiked(user_id: number, videoId:string): Observable<boolean>{
      return this.http.get<boolean>(environment.apiUrl+"/publication/isLiked/"+user_id+"/"+videoId);
    }

}
