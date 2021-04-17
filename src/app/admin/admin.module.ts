import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {RouterModule} from '@angular/router'
import {LoadingComponent} from '../shared/loading/loading.component'
import {EditPageComponent} from './edit-page/edit-page.component'
import {AuthGuard} from '../shared/auth.guard'
import {OrdersPageComponent} from './orders-page/orders-page.component'
import {AddPageComponent} from './add-page/add-page.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {AdminLayoutComponent} from './admin-layout/admin-layout.component'
import {LoginPageComponent} from './login-page/login-page.component'
import {SearchPipe} from '../shared/search.pipe'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {QuillModule} from 'ngx-quill'
import {SharedModule} from '../shared/shared.module'




@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardComponent,
    AddPageComponent,
    OrdersPageComponent,
    EditPageComponent,
    LoadingComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    QuillModule.forRoot(
    ),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
          {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
          {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
          {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
    LoadingComponent
  ]
})

export class AdminModule {}

