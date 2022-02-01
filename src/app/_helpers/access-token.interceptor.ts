import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
    constructor() {}


    token = "ya29.A0ARrdaM8FFr1at7FqFtBQm0VnktONrXN5z3hzbgt1NzG2QNx4asvMCJQwpnLvXzX7pAsdT9OLdAHfVTkcNKOaXtI-WX-JviPjHkeNk6yAPhaUeahLEBOfmiZpZ7DLsafj2Ss95f04b66rybhiEF7QH3aGvF_1qQ"


    // tokenId = "test";

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.getCurrentUser;
        // if (currentUser && currentUser.token) {

        console.log("interceptor");


           

            request = request.clone({
                setHeaders: { 
                    'Authorization': `${this.token}`
                    },
            });

            // const modified = request.clone({ 
            //     setHeaders: { "Authorization": "Wolverine" } 
            //   });
              return next.handle(request);

            // console.log("interceptor");
            // console.log(request);
        // }

        // return next.handle(request);
    }
}
