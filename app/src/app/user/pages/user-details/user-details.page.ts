import {Component} from "@angular/core";
import {UserDto} from "@app/auth/dtos/user.dto";
import {AuthService} from "@app/auth/services/auth.service";
import {NotificationsService} from "@app/notifications/services/notifications.service";
import {read} from "@app/shared/model/observable/read";
import {UpdateUserFormGroup} from "@app/user/model/form-groups/update-user.form-group";
import {UserService} from "@app/user/services/user.service";
import {Observable} from "rxjs";

@Component({
    templateUrl: 'user-details.page.html'
})
export class UserDetailsPage {
    public readonly form: UpdateUserFormGroup = new UpdateUserFormGroup();
    public readonly currentUser: Observable<UserDto | null> = this._authService.currentUser;

    constructor(
        private readonly _authService: AuthService,
        private readonly _userService: UserService,
        private readonly _notificationsService: NotificationsService
    ) {}

    public async onSubmitted(): Promise<void> {
        try {
            if (this.form.invalid) {
                return;
            }

            this.form.disableFormControls();
            await read(this._userService.updateUser(this.form.toUpdateUserDto()));
            this._notificationsService.showSuccessNotification('Użytkownik został zaktualizowany');
        } catch (error) {
            this._notificationsService.showErrorNotification('Wystąpił błąd w trakcie aktualizacji danych');
        } finally {
            this.form.enableFormControls();
        }

    }

}
