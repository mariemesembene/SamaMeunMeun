import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class TokenIdInterceptor implements HttpInterceptor {

    constructor() {
    }

    idToken= "eyJhbGciOiJSUzI1NiIsImtpZCI6IjllYWEwMjZmNjM1MTU3ZGZhZDUzMmU0MTgzYTZiODIzZDc1MmFkMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODMyODAxNTA4NzI2LXVuMGlpOWttZWxsbjNxaHFsMGhmZ3JxdTR1ZzJtNjI4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODMyODAxNTA4NzI2LXVuMGlpOWttZWxsbjNxaHFsMGhmZ3JxdTR1ZzJtNjI4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3MzU4MTY2OTExNTQwNTAwNjYwIiwiZW1haWwiOiJuZGV5ZXNhbHlkaW9uZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlBzb3NRcU5sdEZuMl9Ta2pZMmJzM0EiLCJuYW1lIjoiTmRleWUgU2FseSBEaW9uZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaFFyWHcxOVNkMzlqNTRsOU1lRThoMkFpVWZ3WDlKRW04d2lybEZBQT1zOTYtYyIsImdpdmVuX25hbWUiOiJOZGV5ZSBTYWx5IiwiZmFtaWx5X25hbWUiOiJEaW9uZSIsImxvY2FsZSI6ImZyIiwiaWF0IjoxNjQzNzMzMzAyLCJleHAiOjE2NDM3MzY5MDIsImp0aSI6IjFlMzY4YTViM2Q2NjkyMzhiMzUzMTY2ODYyMzNjNjFjOTRlMGQzN2MifQ.QlYANuHrSr2J-ovQeydv0UlN16LkrKZEWUjNuuEAeTh5Vt98MQNsOJwwfrNRjvuzzNYXpXvQVUAPIlNg3hoJ8gtJlJ4k1W-c-VxujrMre1qsD_6GQk21WkCRuocNG3NS24f8DjpYn9_sRH57RJxUKeMM77ZE9w3I82DExGLL0by3BnkETIbkestBoBVTBzDjFM0B0YhgJdyO7nTa8FUqRRZswk0-Xr92yyP6ZZzhEmqOn7Mx49p0EEl_k7_AiYm9dg8ualsFe8i174Uacz2Aaav0dFgUBz-Z42sFll9oD2Js2F-sYTiiikOsilLsHf_VPFm6LYaTlJ6_cbDvcjIcbQ"

    // tokenId = "test";

    private isValidRequestForInterceptor(requestUrl: string): boolean {
        if(requestUrl.includes("youtube")){
            return false
        }
        return true;
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.getCurrentUser;
        // if (currentUser && currentUser.token) {


           

            // const modified = request.clone({
            //     setHeaders: { 
            //         'Content-Typet': 'application/json',
            //         'Authorization': `${this.token}`,
            //         },
            // });

            if (this.isValidRequestForInterceptor(request.url)) {
                console.log("token id interceptor");
                let modifiedRequest = request.clone({
                  setHeaders: {
                    //DO WORK HERE
                    'tokenId': this.idToken
                  }
                });
          
                return next.handle(modifiedRequest);
              }
              return next.handle(request);


            // console.log("interceptor");
            // console.log(request);
        // }

        // return next.handle(request);
    }
}
