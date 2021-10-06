import {CommonModule} from "@angular/common";
import {NgModule, Type} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {RouterModule, Routes} from "@angular/router";
import {AuthModule} from "@app/auth/auth.module";
import {ProtocolsModule} from "@app/protocols/protocols.module";
import {UpdateUserComponent} from "@app/user/components/update-user/update-user.component";
import {UserDetailsPage} from "@app/user/pages/user-details/user-details.page";
import {UserService} from "@app/user/services/user.service";

const pages: Type<any>[] = [
    UserDetailsPage
];

const components: Type<any>[] = [
    UpdateUserComponent
];

const services: Type<any>[] = [
    UserService
];

const routes: Routes = [
    {
        path: '',
        component: UserDetailsPage
    }
];

@NgModule({
    declarations: [...pages, ...components],
    providers: [...services],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        ProtocolsModule
    ]
})

export class UserModule { }
