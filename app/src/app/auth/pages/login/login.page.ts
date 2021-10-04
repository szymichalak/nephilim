import {Component} from "@angular/core";
import {AuthService} from "@app/auth/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginFormGroup} from "@app/auth/model/form-groups/login.form-group";
import {read} from "@app/shared/model/observable/read";

@Component({
    templateUrl: 'login.page.html'
})
export class LoginPage {
    public readonly form: LoginFormGroup = new LoginFormGroup();
    constructor(
        private readonly _autService: AuthService,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute
    ) { }

    public async onSubmitted(): Promise<void> {
        try {
            await read(this._autService.login(this.form.login.value, this.form.password.value));
            await this._router.navigate(['/user']);
        } catch (error) {

        }

        this._autService.login(this.form.login.value, this.form.password.value).subscribe(async () => {
            await this._router.navigate(['/user'])
        }, (error) => {
            // handle error
        });
    }
}
