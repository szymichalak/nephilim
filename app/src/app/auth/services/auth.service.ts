import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoginDto} from "@app/auth/dtos/login";
import {LoginResponseDto} from "@app/auth/dtos/login-repsonse";

@Injectable()
export class AuthService {
    private readonly EXPIRE_DATE: string = 'expireDate';
    private readonly TOKEN: string = 'token';

    private _isLoggedIn: boolean = false;

    constructor(
        private readonly _http: HttpClient,
        private readonly _router: Router
    ) {
        this._isLoggedIn = (new Date()).getTime() < parseInt(window.localStorage.getItem(this.EXPIRE_DATE) ?? '0');
    }

    public login(login: string, password: string): void {
        const body: LoginDto = {login, password};
        this._http.post<LoginResponseDto>('bezpieczny_wozek://auth/login', body)
        .subscribe(loginDetails => {
            if (loginDetails.code === "ok") {
                window.localStorage.setItem(this.EXPIRE_DATE, Date.parse(loginDetails.data.expireDate).toString());
                window.localStorage.setItem(this.TOKEN, loginDetails.data.key);
                this._isLoggedIn = true;
                this._router.navigate(['/user']);
            }
        });
    }

    public logout(): void {
        window.localStorage.removeItem(this.EXPIRE_DATE);
        window.localStorage.removeItem(this.TOKEN);
        this._isLoggedIn = false;
        this._router.navigate(['/auth/login']);
    }

    public isLoggedIn(): boolean {
        const active: boolean = (new Date()).getTime() < parseInt(window.localStorage.getItem(this.EXPIRE_DATE) ?? '0');
        return active && this._isLoggedIn;
    }

    public getToken(): string {
        return window.localStorage.getItem(this.TOKEN) ?? '';
    }
}
