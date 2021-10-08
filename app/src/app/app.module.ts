import {HttpClientModule} from "@angular/common/http";
import {APP_INITIALIZER, NgModule, Provider} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from "@app/auth/auth.module";
import {AuthService} from "@app/auth/services/auth.service";
import {initializeApp} from "@app/initializeApp";
import {NotificationsModule} from "@app/notifications/notifications.module";
import {ProtocolsModule} from "@app/protocols/protocols.module";
import {SharedModule} from "@app/shared/shared.module";
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  }
];

const providers: Provider = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [AuthService],
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ProtocolsModule,
    AuthModule.forRoot(),
    SharedModule.forRoot(window, window.localStorage),
    NotificationsModule
  ],
  providers: [...providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
