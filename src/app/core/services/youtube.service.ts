import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey : string = 'AIzaSyAIoXZzlj16D9DN1VMgHwOnk0HnA6zPguc';

  constructor(private http: HttpClient) { 
  }

  getVideosFromChannel(channel, maxResults): Observable<any>{
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url)
    .pipe(map((res) => {
      return res;
    }))
  }
}
