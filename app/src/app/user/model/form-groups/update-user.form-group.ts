import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UpdateUserDto} from "@app/user/dtos/UpdateUserDto";
import {checkPasswordValidator} from "@app/user/model/validators/check-password.validator";
import {BehaviorSubject} from "rxjs";
import {filter} from "rxjs/operators";

export class UpdateUserFormGroup extends FormGroup {
    public readonly firstName: FormControl = new FormControl('', Validators.required);
    public readonly lastName: FormControl = new FormControl('', Validators.required);
    public readonly address: FormControl = new FormControl('', Validators.required);
    public readonly postalCode: FormControl = new FormControl('', [Validators.required, Validators.pattern(/\d{2}-\d{3}/), Validators.minLength(6), Validators.maxLength(6)]);
    public readonly city: FormControl = new FormControl('', Validators.required);
    public readonly phone: FormControl = new FormControl('', Validators.required);
    public readonly changePassword: FormControl = new FormControl(false);
    public readonly newPassword: FormControl = new FormControl('');
    public readonly newPasswordConfirm: FormControl = new FormControl('');
    public readonly currentPassword: FormControl = new FormControl('', Validators.required);

    public readonly newPasswordChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly newPasswordConfirmChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {
        super({});

        this.addControl('firstName', this.firstName);
        this.addControl('lastName', this.lastName);
        this.addControl('address', this.address);
        this.addControl('postalCode', this.postalCode);
        this.addControl('city', this.city);
        this.addControl('phone', this.phone);
        this.addControl('changePassword', this.changePassword);
        this.addControl('newPassword', this.newPassword);
        this.addControl('newPasswordConfirm', this.newPasswordConfirm);
        this.addControl('currentPassword', this.currentPassword);

        this.newPassword.addValidators(checkPasswordValidator(this.newPasswordConfirm));
        this.newPasswordConfirm.addValidators(checkPasswordValidator(this.newPassword));

        this.newPassword.disable();
        this.newPasswordConfirm.disable();

        this.newPassword.valueChanges.pipe(
            filter(v => v !== this.newPasswordChanged.value)
        ).subscribe(change => { this.newPasswordChanged.next(change); });
        this.newPasswordChanged.subscribe(_ => { this.newPasswordConfirm.updateValueAndValidity(); });

        this.newPasswordConfirm.valueChanges.pipe(
            filter(v => v !== this.newPasswordConfirmChanged.value)
        ).subscribe(change => { this.newPasswordConfirmChanged.next(change); });
        this.newPasswordConfirmChanged.subscribe(_ => { this.newPassword.updateValueAndValidity(); });
    }

    public toUpdateUserDto(): UpdateUserDto {
        return {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            address: this.address.value,
            postalCode: this.postalCode.value,
            city: this.city.value,
            phone: this.phone.value,
            changePassword: this.changePassword.value,
            newPassword: this.newPassword.value,
            currentPassword: this.currentPassword.value,
        };
    }

    public enableFormControls(): void {
        this.enable();
        if (!this.changePassword) {
            this.addControl("newPassword", this.newPassword);
            this.addControl("newPasswordConfirm", this.newPasswordConfirm);
        }
    }

    public disableFormControls(): void {
        if (!this.changePassword) {
            this.removeControl("newPassword");
            this.removeControl("newPasswordConfirm");
        }
        this.disable();
    }

    public onChangePasswordChanged(event: MatCheckboxChange): void {
        if (event.checked) {
            this.newPassword.addValidators(Validators.required);
            this.newPasswordConfirm.addValidators(Validators.required);
            this.newPassword.enable();
            this.newPasswordConfirm.enable();
        } else {
            this.newPassword.removeValidators(Validators.required);
            this.newPasswordConfirm.removeValidators(Validators.required);
            this.newPassword.reset();
            this.newPasswordConfirm.reset();
            this.newPassword.setValue('');
            this.newPasswordConfirm.setValue('');
            this.newPassword.markAsUntouched();
            this.newPasswordConfirm.markAsUntouched();
            this.newPassword.markAsPristine();
            this.newPasswordConfirm.markAsPristine();
            this.newPassword.disable();
            this.newPasswordConfirm.disable();
        }
    }
}
