import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ModuleWithProviders, NgModule, Provider, Type} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {RouterModule, Routes} from "@angular/router";
import {LoginFormComponent} from "@app/auth/components/login-form/login-form.component";
import {LoggedInGuard} from "@app/auth/guards/logged-in.guard";
import {LoggedOutGuard} from "@app/auth/guards/logged-out.guard";
import {AuthInterceptor} from "@app/auth/interceptors/auth.interceptor";
import {LoginPage} from "@app/auth/pages/login/login.page";
import {AuthService} from "@app/auth/services/auth.service";
import {ProtocolsModule} from "@app/protocols/protocols.module";

const components: Type<any>[] = [
    LoginFormComponent
];

const pages: Type<any>[] = [
    LoginPage
];

const services: Type<any>[] = [
    AuthService
];

const guards: Type<any>[] = [
    LoggedInGuard,
    LoggedOutGuard
];

const interceptors: Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
];

const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginPage
    }
];

@NgModule({
    declarations: [...components, ...pages],
    providers: [],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        CommonModule,
        ProtocolsModule
    ]
})

export class AuthModule {
    public static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [...services, ...guards, ...interceptors]
        };
    }
}
