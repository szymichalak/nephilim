import {AuthTokenDto} from "@app/auth/dtos/auth-token.dto";

export interface LoginResponseDto {
    code: string;
    data: AuthTokenDto;
}
