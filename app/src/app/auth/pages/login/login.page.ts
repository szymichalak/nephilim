import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginFormGroup} from "@app/auth/model/form-groups/login.form-group";
import {AuthService} from "@app/auth/services/auth.service";
import {NotificationsService} from "@app/notifications/services/notifications.service";
import {read} from "@app/shared/model/observable/read";

@Component({
    templateUrl: 'login.page.html'
})
export class LoginPage {
    public readonly form: LoginFormGroup = new LoginFormGroup();
    constructor(
        private readonly _autService: AuthService,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _notificationService: NotificationsService
    ) { }

    public async onSubmitted(): Promise<void> {
        this.form.disableFormControls();
        try {
            await read(this._autService.login(this.form.login.value, this.form.password.value));
            await this._router.navigate(['/user']);
        } catch (error) {
            this._notificationService.showErrorNotification("Nie udało się zalogować");
        } finally {
            this.form.enableFormControls();
        }
    }
}
