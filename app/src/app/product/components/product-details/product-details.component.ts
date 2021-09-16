import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductDetailsModel} from "@app/product/models/product-details.model";

@Component({
    selector: 'app-product-details',
    templateUrl: 'product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent implements OnInit {

    @Input() public productData: ProductDetailsModel = new ProductDetailsModel();


    public ngOnInit(): void {
        console.log(this.productData);
    }
}
