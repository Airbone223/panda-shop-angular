import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, mergeMap} from 'rxjs/operators'
import {ProductService} from './shared/product.service'
import {OrdersService} from './shared/orders.service'
import {getAll, getAllSuccess,
  getById, getByIdSuccess,
  removeProduct, removeProductSuccess} from './reducers/product/product-actions'
import {
  addToCart,
  calculateTotal,
  getOrders,
  getOrdersSuccess,
  removeFromCart,
  removeOrderFromServer, removeOrderSuccess
} from './reducers/order/order-actions'
import {of} from 'rxjs'


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private productServ: ProductService,
              private orderService: OrdersService
  ) {
  }

  getAll$ = createEffect(() => this.actions$
    .pipe(ofType(getAll),
      mergeMap(() => this.productServ.getAll()
        .pipe(
          catchError( () =>
            of([]))
        )
        .pipe(
          map(products => (getAllSuccess({products})))))))

  getById$ = createEffect(() => this.actions$
    .pipe(ofType(getById),
      mergeMap(({id}) => {
        return this.productServ.getById(id)
          .pipe(
            map(product => (getByIdSuccess({product}))))
      })))

  getTotalPrice$ = createEffect(() => this.actions$
    .pipe(ofType(addToCart, removeFromCart),
      map(() => (calculateTotal()))))

  getAllOrders$ = createEffect(() => this.actions$
    .pipe(ofType(getOrders),
      mergeMap(() => this.orderService.getAll()
        .pipe(
          catchError( () =>
            of([]))
        )
        .pipe(
          map(allOrders => (getOrdersSuccess({allOrders})))))
    ))

  removeOrder$ = createEffect(() => this.actions$
    .pipe(ofType(removeOrderFromServer),
      mergeMap(({id}) => this.orderService.remove(id)
        .pipe(
          map(() => (removeOrderSuccess({id})))))))

  removeProduct$ = createEffect(() => this.actions$
    .pipe(ofType(removeProduct),
      mergeMap(({id}) => {
        return this.productServ.remove(id)
          .pipe(
            map(product => (removeProductSuccess({id}))))
      })))
}
