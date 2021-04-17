import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {MainLayoutComponent} from './main/main-layout/main-layout.component'
import {MainPageComponent} from './main/main-page/main-page.component'
import {ProductPageComponent} from './main/product-page/product-page.component'
import {CartPageComponent} from './main/cart-page/cart-page.component'
import {AdminModule} from './admin/admin.module'

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => AdminModule
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
