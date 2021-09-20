import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductDetailsDto} from "@app/product/dtos/product-details";
import {getProductDetails} from "@app/product/selectors/data";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    templateUrl: 'product.page.html'
})
export class ProductPage {
    public readonly productDetails: Observable<ProductDetailsDto> = this._activatedRoute.data.pipe(
        map(getProductDetails)
    );

    constructor(private readonly _activatedRoute: ActivatedRoute) { }
}
