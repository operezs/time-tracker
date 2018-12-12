import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private tokenValue: string;

    constructor(private authService: NbAuthService) {
        this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                if (token.isValid()) {
                    this.tokenValue = token.getValue();
                }
            });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.authService.isAuthenticated().subscribe((authenticated) => {
            if (authenticated) {
                const JWT = `Bearer ${this.tokenValue}`;
                request = request.clone({
                    setHeaders: {
                        Authorization: JWT,
                    },
                });
            }
        });

        return next.handle(request);
    }
}
