import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ProductDetailsDto} from "@app/product/dtos/product-details";
import {getProductName} from "@app/product/selectors/params";
import {ProductsService} from "@app/product/services/products.service";
import {Observable} from "rxjs";

@Injectable()
export class ProductDetailsResolver implements Resolve<ProductDetailsDto> {
    constructor(private readonly _service: ProductsService) { }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ProductDetailsDto> {
        const name: string = getProductName(route.params);
        return this._service.getDetails(name);
    }
}
