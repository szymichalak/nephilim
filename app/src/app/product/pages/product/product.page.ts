import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {ProductDetailsModel} from "@app/product/models/product-details.model";

@Component({
    templateUrl: 'product.page.html'
})
export class ProductPage implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute) { }

    public productData: ProductDetailsModel = new ProductDetailsModel();

    public ngOnInit(): void {
        this._activatedRoute.data.subscribe((data: Data) => {
            this.productData = data['data'];
        });
    }

}
