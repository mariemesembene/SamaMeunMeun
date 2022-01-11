import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    // token = "ya29.a0ARrdaM-Lqj8XdcjV-njKcu3BR-vFzHCmHHuXLeSnJ8V-hA2tbKcIJY1QTucgOI8QoL8-014F481Q30VYeoPGO1FFMRtlzk7Jxs19S__Hv0xie1soEEtoi8Li4eRbmZANU9Tj6VewCkaSsBVr5fMDYeVvjrRQAg"

    // token = "ya29.a0ARrdaM8sJ2TTPj4T0i-avV7UBsdA6s1dOqJMnMwgg9fBpo0gBmXR2aPAjxkEdNrvVg2-9tYvppjQ76PU394l2rF_Rb0JUlhkBx1f916EP0eREeQ01Y9pJvz8xEpiynZiVWPFbrS_LqCc6ydQyX3BwG-uiHTKug";

    // token ="ya29.a0ARrdaM_ficpHYztAfHcMNaBTYmsi51LOmmembQeQISmqyXtBwuHVKUoJpwG6j6xz4hPup_PaI3Dz7MC-HxiGP0VXqy59rJjswAAmLslZdcbrd3xMNX9V7lHLU9tJpd6J0uqvj1GnJDGj0NfVmNTmzlvXZXs9"

    token = "ya29.a0ARrdaM_FCpBCMC8P19XNIGQLm7JZwvcaLg-jmJ55zUKbF-OYQ4pTWFv93FHoPxyc7FltouwAe1xHKRKZuz25GpwxDEtXHZpywjl81PzOlBTukdHhpmstC6irUL28MITfwbgncVNkXLQQp2CbtjcGpa5pAjWcag";

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.getCurrentUser;
        // if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${this.token}`
                }
            });

            console.log("interceptor");
            console.log(request);
        // }

        return next.handle(request);
    }
}
