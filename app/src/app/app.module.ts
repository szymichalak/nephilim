import {NgModule, Type} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApiService} from "@app/product/providers/api.service";
import {ProductDetailsResolver} from "@app/product/providers/product-details.resolver";
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
  }
];

const providers: Type<any>[] = [
  ProductDetailsResolver
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
