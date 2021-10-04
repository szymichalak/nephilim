import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "@app/auth/services/auth.service";
import {map} from "rxjs/operators";

@Injectable()
export class LoggedOutGuard implements CanActivate, CanActivateChild {
    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authService.isLoggedIn.pipe(
            map((isLoggedIn) => {
                return isLoggedIn ? this._router.createUrlTree(['/', 'user']) : true;
            })
        );
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

}
