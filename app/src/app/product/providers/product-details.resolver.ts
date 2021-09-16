import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ProductDetailsModel} from "@app/product/models/product-details.model";
import {ProductModule} from "@app/product/product.module";
import {ApiService} from "@app/product/providers/api.service";
import {Observable} from "rxjs";


export class ProductDetailsResolver implements Resolve<ProductDetailsModel> {
    constructor(private _service: ApiService) { }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ProductDetailsModel> {
        const name: string = route.paramMap.get('productName') ?? '';
        return this._service.getProductDetails(name);
    }
}
