import {Component} from "@angular/core";
import {UserDto} from "@app/auth/dtos/user.dto";
import {AuthService} from "@app/auth/services/auth.service";
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

    constructor(private readonly _authService: AuthService, private readonly _userService: UserService) {}

    public async onSubmitted(): Promise<void> {
        try {
            if (this.form.invalid) {
                return;
            }

            this.disableFormControls();
            await read(this._userService.updateUser(this.form.toUpdateUserDto()));
        } catch (error) {

        } finally {
            this.enableFormControls();
        }

    }

    private disableFormControls(): void {
        if (!this.form.changePassword) {
            this.form.removeControl("newPassword");
            this.form.removeControl("newPasswordConfirm");
        }
        this.form.disable();
    }

    private enableFormControls(): void {
        this.form.enable();
        if (!this.form.changePassword) {
            this.form.addControl("newPassword", this.form.newPassword);
            this.form.addControl("newPasswordConfirm", this.form.newPasswordConfirm);
        }
    }

}
