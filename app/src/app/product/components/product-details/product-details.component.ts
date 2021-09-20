import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ProductDetailsDto} from "@app/product/dtos/product-details";

@Component({
    selector: 'app-product-details',
    templateUrl: 'product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent {
    @Input()
    public productData: ProductDetailsDto;
}
