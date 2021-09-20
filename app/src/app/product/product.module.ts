import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule, Type} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from "@app/auth/auth.module";
import {ProductDetailComponent} from '@app/product/components/product-details/product-details.component';
import {ProductPage} from '@app/product/pages/product/product.page';
import {ProductsListPage} from "@app/product/pages/products-list/products-list.page";
import {ProductDetailsResolver} from "@app/product/resolvers/product-details.resolver";
import {ProductsService} from "@app/product/services/products.service";
import {ProtocolsModule} from "@app/protocols/protocols.module";

const components: Type<any>[] = [
    ProductDetailComponent
];

const pages: Type<any>[] = [
    ProductPage,
    ProductsListPage
];

const resolvers: Type<any>[] = [
    ProductDetailsResolver
];

const services: Type<any>[] = [
    ProductsService
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
            productDetails: ProductDetailsResolver
        }
    }
];

@NgModule({
    declarations: [...components, ...pages],
    providers: [...services, ...resolvers],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatButtonModule,
        CommonModule,
        AuthModule,
        ProtocolsModule
    ]
})
export class ProductModule {
}
