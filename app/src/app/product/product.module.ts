import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule, Type} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from '@app/product/components/product-details/product-details.component';
import {ProductPage} from '@app/product/pages/product/product.page';
import {ProductsListPage} from "@app/product/pages/products-list/products-list.page";
import {ApiService} from "@app/product/providers/api.service";
import {ProductDetailsResolver} from "@app/product/providers/product-details.resolver";

const components: Type<any>[] = [
    ProductDetailComponent
];

const pages: Type<any>[] = [
    ProductPage,
    ProductsListPage
];

const providers: Type<any>[] = [
    ProductDetailsResolver
];

const routes: Routes = [
    {
        path: '',
        children: [

        ],
        component: ProductsListPage
    },
    {
        path: 'details/:productName',
        component: ProductPage,
        resolve: {
            data: ProductDetailsResolver
        }
    }
];

@NgModule({
    declarations: [...components, ...pages],
    providers: [
        ApiService,
        {
            provide: ProductDetailsResolver,
            deps: [ApiService]
        }
    ],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatButtonModule,
        CommonModule
    ]
})
export class ProductModule {
}
