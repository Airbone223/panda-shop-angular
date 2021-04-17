import { Injectable } from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {changeUpdatedAt, clear, decrease, getAll, getAllSuccess, increase} from './reducers/counter'
import {map, mergeMap} from 'rxjs/operators'
import {ProductService} from './shared/product.service'

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private productServ: ProductService) {}
  updatedAt$ = createEffect(() => this.actions$
    .pipe(ofType(increase, decrease, clear),
      map(() => changeUpdatedAt({
        updatedAt: Date.now()
      }))
      ))
  getAllSuccess$ = createEffect(() => this.actions$
    .pipe(ofType(getAll),
        mergeMap(() => this.productServ.getAll()
          .pipe(
            map(product => ({ type: '[PRODUCT] load product success', product, loading: false }))))))
}

