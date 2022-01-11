import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment';
import { Statistic } from '../models/Statistic';
import { Video } from '../models/Video';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  // apiKey : string = 'AIzaSyAIoXZzlj16D9DN1VMgHwOnk0HnA6zPguc';
// compte samameunmeun => clé API 2
  constructor(private http: HttpClient) { 
  }

  // enlever le &part=snippet pour tester

  // let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAIoXZzlj16D9DN1VMgHwOnk0HnA6zPguc&channelId=UCdQuSklyXrfjOdqJ0wHqBng&order=date&part=snippet &type=video,id&maxResults=2'


  getVideosFromChannel(maxResults: number): Observable<any>{
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + environment.apiKey + 
    '&channelId=' + environment.channelId + '&order=date&part=snippet&type=video,id&maxResults=' + maxResults
    return this.http.get(url)
    .pipe(map((res) => {
      return res;
    }))
  }
  

    // recupérer les commentaires d'une vidéo youtube
    getCommentsOfVideo(videoId: string): Observable<any>{
      return this.http.get("https://www.googleapis.com/youtube/v3/commentThreads?key="+
      environment.apiKey+"&textFormat=plainText&part=snippet,replies&videoId="+videoId)
    }

    // fontion permettant de poster un comment
//     POST https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key={YOUR_API_KEY}
// {
//  "snippet": {
//   "channelId": "channel Id of the video",
//   "topLevelComment": {
//    "snippet": {
//     "textOriginal": "YOUR_COMMENTS",
//     "videoId": "the Id of the video"
//    }
//   }
//  }
// }

// replies => use comment instead of comment thread

// POST https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
// Content-Type: application/json
// {
//   "snippet": {
//     "parentId": "UgxA-9t-bGKKlW_pqoF4AaABAg",
//     "channelId": "UCmy4iPJEI-IeRNaItYOdsKA",
//     "textDisplay": "test",
//     "textOriginal": "test",
//     "videoId": "fAHoPlxTqQk"
//   }
// }

    postComment(commentText: string, videoId: string): Observable<any>{
      const body = {
        "snippet": {
         "channelId": environment.channelId,
         "topLevelComment": {
          "snippet": {
           "textOriginal": commentText,
           "videoId": videoId
          }
         }
        }
      }
      return this.http.post("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key="+
                            environment.apiKey, body)
    }

    // fonction permettant de répondre à un commentaire
    reply(replyText: string, videoId: string, parentId: string){
      const body = {
    "snippet": {
      "parentId": parentId,
      "channelId": environment.channelId,
      "textOriginal": replyText,
      "videoId": videoId
      }
    }

    return this.http.post("https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key="+
                          environment.apiKey, body)
    } 




    // fonction permettant d'annuler un like
    cancelLikeComment(commentaire: Comment){
       // on incrémente le nombre de like du commentaire
       const body = {
        "snippet": {
          "channelId": environment.channelId,
          "likeCount": commentaire.snippet.likeCount+1
      },
      "id": commentaire.id
      }

      return this.http.put("https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key="+environment.apiKey, body);

      // s'il y'a succès : dans notre base de données on doit supprimer la ligne avec l'email de l'utilisateur, son nom, l'url de sa photo et l'id du commentaire

    }

    // fonction permettant d'aimer un commentaire
    likeComment(commentaire: Comment){
      // on incrémente le nombre de like du commentaire
      const body = {
        "snippet": {
          "channelId": environment.channelId,
          "likeCount": commentaire.snippet.likeCount+1
      },
      "id": commentaire.id
      }

      return this.http.put("https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key="+environment.apiKey, body);

      // s'il y'a succès : dans notre base de données on doit inserer une ligne avec l'email de l'utilisateur, son nom, l'url de sa photo et l'id du commentaire
    }

  

    // fonction permettant d'aimer une video
    likeVideo(video: Video){
      return this.http.post("https://youtube.googleapis.com/youtube/v3/videos/rate?id="+video.id.videoId+
      "&rating=like&key="+environment.apiKey, null);
    }
  

    // fonction pour récuperer les statistiques d'une
    getVideoStatistics(videoId:string){
      return this.http.get("https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+videoId+
                          "&key="+environment.apiKey);
    }

    // fonction permettant de mettre à jour le nombre de likes d'une video
    updateVideoLikeCount(video: Video){
      const body = {
        "id": video.id.videoId,
        "statistics": {
          "likeCount": video.statistics.likeCount+1
        }
      }
      return this.http.put("https://www.googleapis.com/youtube/v3/videos?part=statistics&key="+environment.apiKey, body);
    }

    // fonction permettant de tester si l'utilisateur connecté à aimer la video ou pas
    verifyUserLike(videoId: string): Observable<any>{
      return this.http.get("https://youtube.googleapis.com/youtube/v3/videos/getRating?id="+videoId+
      "&key="+environment.apiKey);
    }

  }
