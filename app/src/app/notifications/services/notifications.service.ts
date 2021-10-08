import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class NotificationsService {
    private _timeDuration: number = 3000;

    constructor(private readonly _snackBar: MatSnackBar) {}

    public showSuccessNotification(message: string): void {
        this._snackBar.open(message, undefined, {duration: this._timeDuration, panelClass: ['c-notification--success']});
    }

    public showErrorNotification(message: string): void {
        this._snackBar.open(message, undefined, {duration: this._timeDuration, panelClass: ['c-notification--error']});
    }

    public changeDuration(newDuration: number): void {
        this._timeDuration = newDuration;
    }
}
