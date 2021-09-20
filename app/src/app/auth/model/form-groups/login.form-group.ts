import {FormControl, FormGroup, Validators} from "@angular/forms";

export class LoginFormGroup extends  FormGroup {
    public readonly login: FormControl = new FormControl('szymonmichalak97@gmail.com', Validators.required);
    public readonly password: FormControl = new FormControl('!qazXSW2', Validators.required);
    constructor() {
        super({});

        this.addControl('login', this.login);
        this.addControl('password', this.password);
    }
}
