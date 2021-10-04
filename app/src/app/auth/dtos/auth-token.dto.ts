import {UserDto} from "@app/auth/dtos/user.dto";

export interface AuthTokenDto {
    expireDate: string;
    key: string;
    user: UserDto;
}
