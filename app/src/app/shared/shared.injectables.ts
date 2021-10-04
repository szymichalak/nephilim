import {InjectionToken} from "@angular/core";

export const WINDOW: InjectionToken<Window> = new InjectionToken<Window>('SharedModule.window');
export const STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>('SharedModule.storage');
