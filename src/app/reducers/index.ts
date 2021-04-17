import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store'

import {environment} from '../../environments/environment'
import {PRODUCT_KEY, productReducer} from './product/product'
import {OrderState, ProductState} from '../shared/inerfaces'
import {ORDER_KEY, orderReducer} from './order/order'



export interface State {
  [PRODUCT_KEY]: ProductState
  [ORDER_KEY]: OrderState
}

export const reducers: ActionReducerMap<State> = {
[PRODUCT_KEY]: productReducer,
[ORDER_KEY]: orderReducer
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
