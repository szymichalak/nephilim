import {Params} from "@angular/router";

export function getProductName(params: Params): string {
    return params.productName ?? '';
}
