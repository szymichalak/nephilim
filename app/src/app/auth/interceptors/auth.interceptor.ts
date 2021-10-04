import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from "@app/auth/services/auth.service";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly _authService: AuthService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._authService.accessKey.pipe(
            switchMap(token => {
                if (token) {
                    req = req.clone({
                        setHeaders: {
                            'Content-Type' : 'application/json; charset=utf-8',
                            'Accept'       : 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                }
                return next.handle(req);
            })
        )
    }
}
