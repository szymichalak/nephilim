import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProtocolService} from "@app/protocols/services/protocols.service";
import {Observable} from "rxjs";

@Injectable()
export class ProtocolsInterceptor implements HttpInterceptor {
    constructor(private readonly _protocolService: ProtocolService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            url: this._protocolService.getUrl(req.url)
        });

        return next.handle(req);
    }
}
