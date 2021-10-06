import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateUserDto} from "@app/user/dtos/UpdateUserDto";
import {checkPasswordValidator} from "@app/user/model/validators/check-password.validator";

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
}
