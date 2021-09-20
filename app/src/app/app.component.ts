import { Component } from '@angular/core';
import {AuthService} from "@app/auth/services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private readonly _authService: AuthService) { }

    public isLoggedIn(): boolean {
        return this._authService.isLoggedIn();
    }

    public logout(): void {
        this._authService.logout();
    }
}
