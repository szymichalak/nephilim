import {DataDto} from "@app/auth/dtos/data";

export interface LoginResponseDto {
    code: string;
    data: DataDto;
}
