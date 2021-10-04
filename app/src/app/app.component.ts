import { Component } from '@angular/core';
import {AuthService} from "@app/auth/services/auth.service";
import {Observable} from "rxjs";
import {read} from "@app/shared/model/observable/read";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public readonly isLoggedIn: Observable<boolean> = this._authService.isLoggedIn;

    constructor(private readonly _authService: AuthService) { }

    public async cośTam() {
        const isLoggedIn: boolean = await read(this.isLoggedIn);
    }

    public logout(): void {
        this._authService.logout();
    }
}
