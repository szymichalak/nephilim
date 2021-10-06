import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkPasswordValidator(password: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (password.untouched) {
            return null;
        }
        const confirm: string = control.value;
        if (password.value !== confirm) {
            return { 'confirm': false };
        }
        return null;
    };
}
