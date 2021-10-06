import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UserDto} from "@app/auth/dtos/user.dto";
import {UpdateUserFormGroup} from "@app/user/model/form-groups/update-user.form-group";

@Component({
    templateUrl: 'update-user.component.html',
    selector: 'app-update-user'
})
export class UpdateUserComponent implements OnInit {
    @Input() public control: UpdateUserFormGroup;
    @Input() public currentUser: UserDto | null;
    @Output() public readonly submitted: EventEmitter<void> = new EventEmitter<void>();

    public ngOnInit(): void {
        if (this.currentUser) {
            this.control.firstName.setValue(this.currentUser.firstName);
            this.control.lastName.setValue(this.currentUser.lastName);
            this.control.address.setValue(this.currentUser.address);
            this.control.postalCode.setValue(this.currentUser.postalCode);
            this.control.city.setValue(this.currentUser.city);
            this.control.phone.setValue(this.currentUser.phone);
        }
    }

    public getPostalCodeError(): string {
        return "Niepoprawny format kodu pocztowego";
    }

    public getRequiredError(): string {
        return "To pole jest wymagane";
    }

    public getPasswordNotConfirmedError(): string {
        return "Hasła nie są zgodne";
    }

    public onChangePasswordChanged(event: MatCheckboxChange): void {
        if (event.checked) {
            this.control.newPassword.addValidators(Validators.required);
            this.control.newPasswordConfirm.addValidators(Validators.required);
            this.control.newPassword.enable();
            this.control.newPasswordConfirm.enable();
        } else {
            this.control.newPassword.removeValidators(Validators.required);
            this.control.newPasswordConfirm.removeValidators(Validators.required);
            this.control.newPassword.reset();
            this.control.newPasswordConfirm.reset();
            this.control.newPassword.setValue('');
            this.control.newPasswordConfirm.setValue('');
            this.control.newPassword.markAsUntouched();
            this.control.newPasswordConfirm.markAsUntouched();
            this.control.newPassword.markAsPristine();
            this.control.newPasswordConfirm.markAsPristine();
            this.control.newPassword.disable();
            this.control.newPasswordConfirm.disable();
        }
    }
}
