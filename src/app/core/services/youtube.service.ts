import { HttpClient, HttpResponse } from '@angular/common/http';
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
    // https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=[YOUR_API_KEY] HTTP/1.1

    let url = environment.youtubeMockUrl;

    // let url = 'https://www.googleapis.com/youtube/v3/search?key=' + environment.apiKey + 
    // '&channelId=' + environment.channelId + '&order=date&part=snippet&type=video,id&maxResults=' + maxResults
    return this.http.get(url)
    .pipe(map((res) => {
      console.log("mock videos");
      console.log(res);
      return res;
    }))
  }

  testMockUrl():Observable<any>{
    return this.http.get<any>(environment.youtubeMockUrl);
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



  

    // fonction permettant d'aimer une video
    likeVideo(videoId, rate, userEmail){
      const body = {
        'videoId': videoId, 'rate':rate, 'userEmail':userEmail
      }
      return this.http.post(environment.apiUrl+"/youtube/likeVideo", body);
      // return this.http.post("https://youtube.googleapis.com/youtube/v3/videos/rate?id="+video.id.videoId+
      // "&rating=like&key="+environment.apiKey, null)
      // .pipe(
      //   map(
      //     (response: HttpResponse<JSON>) => {
      //       // si tout ce passe bien on envoie les données vers le back
      //       // console.log("like vide");
      //       // console.log(sucess);
      //       // on teste si la requete a bien passé => code 204
      //       if(response.status==204){

      //       }
            
      //       return response;
      //     }
      //   )
      // );
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

    getProtectedMessage(){
      const body = {
        "displayText": "Hi",
        "video": {
          "videoId": "fAHoPlxTqQk"
        }
      }
      return this.http.post(environment.apiUrl+"/comments", body);

    }


  }
