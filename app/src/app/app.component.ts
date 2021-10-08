import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@app/auth/services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public readonly isLoggedIn: Observable<boolean> = this._authService.isLoggedIn;

    constructor(private readonly _authService: AuthService, private readonly _router: Router) { }

    public async logout(): Promise<void> {
        await this._authService.logout();
        await this._router.navigate(['/auth/login']);
    }
}
