import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginFormGroup} from "@app/auth/model/form-groups/login.form-group";
import {AuthService} from "@app/auth/services/auth.service";

@Component({
    templateUrl: 'login-form.component.html',
    selector: 'app-login-form'
})
export class LoginFormComponent implements OnInit {
    public readonly form: LoginFormGroup = new LoginFormGroup();

    constructor(
        private readonly _autService: AuthService,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        if (this._autService.isLoggedIn()) {
            this._router.navigate(['/user']);
        }
    }

    public onSubmit(): void {
        this._autService.login(this.form.login.value, this.form.password.value);
    }
}
