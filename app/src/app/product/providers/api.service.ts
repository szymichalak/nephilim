import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {ProductDetailsModel} from "@app/product/models/product-details.model";
import {ProductModule} from "@app/product/product.module";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()

export class ApiService {
    constructor(private _http: HttpClient) { }

    public getProductDetails(productName: string): Observable<ProductDetailsModel> {
        return this._http.get<ProductDetailsModel>(`https://api.bezpiecznywozek.com/product/slug/${productName}`);
    }

}
