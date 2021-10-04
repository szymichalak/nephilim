import {Component, EventEmitter, Input, Output} from "@angular/core";
import {LoginFormGroup} from "@app/auth/model/form-groups/login.form-group";

@Component({
    templateUrl: 'login-form.component.html',
    selector: 'app-login-form'
})
export class LoginFormComponent {
    @Input() public control: LoginFormGroup;
    @Output() public readonly submitted: EventEmitter<void> = new EventEmitter<void>();
}
