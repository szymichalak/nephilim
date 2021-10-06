import {Component} from "@angular/core";
import {UserDto} from "@app/auth/dtos/user.dto";
import {AuthService} from "@app/auth/services/auth.service";
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
        if (this.form.invalid) {
             return;
        }

        await this._userService.updateUser(this.form.toUpdateUserDto());
    }

}
