import {ModuleWithProviders, NgModule} from "@angular/core";
import {STORAGE, WINDOW} from "@app/shared/shared.injectables";

@NgModule({
    declarations: []
})

export class SharedModule {
    public static forRoot(window: Window, storage: Storage): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: WINDOW,
                    useValue: window
                },
                {
                    provide: STORAGE,
                    useValue: storage
                }
            ]
        };
    }
}
