import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers} from './reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from './app.effects'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { MainLayoutComponent } from './main/main-layout/main-layout.component'
import { MainPageComponent } from './main/main-page/main-page.component'
import { FooterComponent } from './main/footer/footer.component'
import { CartPageComponent } from './main/cart-page/cart-page.component'
import { ProductPageComponent } from './main/product-page/product-page.component'
import { ProductsComponent } from './main/products/products.component'
import { FilterPipe } from './shared/filter.pipe'
import {AuthIntnerseptor} from './shared/auth.interseptor'
import {ReactiveFormsModule} from '@angular/forms'
import {AdminModule} from './admin/admin.module'
import {QuillModule} from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductsComponent,
    FilterPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),
    AdminModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthIntnerseptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
