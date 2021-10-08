import {HttpClient} from "@angular/common/http";
import {Inject, Injectable, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {AuthTokenDto} from "@app/auth/dtos/auth-token.dto";
import {LoginResponseDto} from "@app/auth/dtos/login-repsonse.dto";
import {LoginDto} from "@app/auth/dtos/login.dto";
import {UserDto} from "@app/auth/dtos/user.dto";
import {read} from "@app/shared/model/observable/read";
import {STORAGE, WINDOW} from "@app/shared/shared.injectables";
import {AsyncSubject, BehaviorSubject, Observable, Subscription} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable()
export class AuthService implements OnDestroy {
    private readonly EXPIRE_DATE: string = 'expireDate';
    private readonly TOKEN: string = 'token';
    private readonly _authToken: BehaviorSubject<AuthTokenDto | null | undefined> = new BehaviorSubject<AuthTokenDto | null | undefined>(undefined);
    public readonly accessKey: Observable<string | null> = this._authToken.pipe(
        map(authToken => authToken?.key ?? null)
    );
    public readonly currentUser: Observable<UserDto | null> = this._authToken.pipe(
        map(authToken => authToken?.user ?? null)
    );
    public readonly isLoggedIn: Observable<boolean> = this._authToken.pipe(
        map(authToken => authToken != null)
    );

    private readonly _subscriptions: Subscription[];

    constructor(
        private readonly _http: HttpClient,
        private readonly _router: Router,
        @Inject(WINDOW) private readonly _window: Window,
        @Inject(STORAGE) private readonly _storage: Storage
    ) {
        this._subscriptions = [
            this._authToken.subscribe(this._onAuthTokenChanged)
        ];
    }

    public login(login: string, password: string): Observable<void> {
        const body: LoginDto = {login, password};
        return this._http.post<LoginResponseDto>('bezpieczny_wozek://auth/login', body)
        .pipe(
            tap(response => {
                if (response.code === "ok") {
                    this._authToken.next(response.data);
                }
            }),
            map(() => undefined)
        );
    }

    public logout(): Observable<void> {
        const result: AsyncSubject<void> = new AsyncSubject<void>();
        result.next(undefined);
        result.complete();
        this._authToken.next(null);
        return result;
    }

    public async initApp(): Promise<void> {
        const accessKey: string | null = this._storage.getItem(this.TOKEN);
        if (accessKey) {
            try {
                const response: LoginResponseDto = await read(this._http.get<LoginResponseDto>('bezpieczny_wozek://auth/token/' + accessKey));
                this._authToken.next(response.data);
            } catch (error) {
                await this._router.navigate(['/auth/login']);
            }
        }
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }

    private readonly _onAuthTokenChanged = (authToken: AuthTokenDto | null | undefined): void => {
        if (authToken === undefined) {
            return;
        }
        if (authToken) {
            this._storage.setItem(this.EXPIRE_DATE, Date.parse(authToken.expireDate).toString());
            this._storage.setItem(this.TOKEN, authToken.key);
        } else {
            this._storage.removeItem(this.EXPIRE_DATE);
            this._storage.removeItem(this.TOKEN);
        }
    }
}
