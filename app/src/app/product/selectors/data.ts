import {Data} from "@angular/router";
import {ProductDetailsDto} from "@app/product/dtos/product-details";

export function getProductDetails(data: Data): ProductDetailsDto {
    return data.productDetails;
}
