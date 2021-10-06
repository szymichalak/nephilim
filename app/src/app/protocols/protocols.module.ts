import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {ProtocolsInterceptor} from "@app/protocols/interceptors/protocols.interceptor";
import {ProtocolService} from "@app/protocols/services/protocols.service";

@NgModule({
    declarations: [],
    providers: [
        ProtocolService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ProtocolsInterceptor,
            multi: true,
        }
    ],
    imports: [
        CommonModule
    ]
})

export class ProtocolsModule { }
