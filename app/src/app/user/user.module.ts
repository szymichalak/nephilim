import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule, Type} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserDetailsPage} from "@app/user/pages/user-details/user-details.page";

const pages: Type<any>[] = [
    UserDetailsPage
];

const routes: Routes = [
    {
        path: '',
        component: UserDetailsPage
    }
];

@NgModule({
    declarations: [...pages],
    providers: [],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        CommonModule
    ]
})

export class UserModule { }
