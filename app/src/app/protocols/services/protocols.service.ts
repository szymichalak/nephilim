import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';

@Injectable()
export class ProtocolService {
    private readonly mapper: Map<string, string> = new Map<string, string>();

    constructor(private readonly _http: HttpClient) {
        this.mapper.set('bezpieczny_wozek', 'https://api.bezpiecznywozek.com/');
    }

    public getUrl(url: string): string {
        const address: string[] = url.split('://');
        if (address.length !== 2) {
            throw new Error('Wrong format of address');
        }
        const protocol: string | undefined = this.mapper.get(address[0]);
        if (protocol == null) {
            throw new Error('No protocol detected');
        }
        return protocol + address[1];
    }
}
