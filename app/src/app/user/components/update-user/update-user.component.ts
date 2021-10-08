import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
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
        return "Niepoprawny format kodu pocztowego. Wymagany format: 12-345";
    }

    public getRequiredError(): string {
        return "To pole jest wymagane";
    }
}
