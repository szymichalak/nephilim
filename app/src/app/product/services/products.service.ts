import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {ProductDetailsDto} from "@app/product/dtos/product-details";
import {Observable} from "rxjs";

@Injectable()
export class ProductsService {
    constructor(private readonly _http: HttpClient) { }

    public getDetails(productName: string): Observable<ProductDetailsDto> {
        return this._http.get<ProductDetailsDto>(`bezpieczny_wozek://product/slug/${productName}`);
    }
}
