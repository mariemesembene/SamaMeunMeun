import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reply } from '../models/Reply';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) { }

  // poster un Reply
  postRepply(id_comment: number, displayText: string): Observable<Reply>
  {
    const body = {
      "displayText": displayText,
      "comment": {
          "id": id_comment
      }
    }
  return this.http.post<Reply>(environment.apiUrl+"/replies", body);
  }

  // PUT reply
  updateReply(displayText: string, id_reply: number): Observable<Reply>
  {
    const body = {
      "displayText": displayText
    }
    return this.http.put<Reply>(environment.apiUrl+"/replies/"+id_reply, body);
  }

  // DELETE reply
  deleteReply(id_reply: number): Observable<any>
  {
    return this.http.delete<Reply>(environment.apiUrl+"/replies/"+id_reply);
  }


  // nombre replies d'un commentaire
  getRepliesCount(comment_id: number): Observable<number>{
    return this.http.get<number>(environment.apiUrl+"/count/replies/comment/"+comment_id);
  }
  
}
