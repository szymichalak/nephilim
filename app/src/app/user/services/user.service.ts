import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UpdateUserDto} from "@app/user/dtos/UpdateUserDto";
import {Observable} from "rxjs";

@Injectable()
export class UserService {
    constructor(private readonly _httpClient: HttpClient) { }

    public updateUser(updateUserData: UpdateUserDto): Observable<any> {
        return this._httpClient.post<any>('bezpieczny_wozek://auth/profile', updateUserData);
    }
}
