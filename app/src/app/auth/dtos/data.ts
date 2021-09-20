import {UserDto} from "@app/auth/dtos/user";

export interface DataDto {
    expireDate: string;
    key: string;
    user: UserDto;
}
