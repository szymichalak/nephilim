export interface UpdateUserDto {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
    changePassword: boolean;
    newPassword: string;
    currentPassword: string;
}
