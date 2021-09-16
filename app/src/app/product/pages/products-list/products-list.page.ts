import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'products-list.page.html'
})
export class ProductsListPage {
    constructor(private _router: Router) {
    }


    public navigateToProduct(productName: string): void {
        this._router.navigate(['/product/details', productName]);
    }
}
