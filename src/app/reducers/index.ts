import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store'

import {environment} from '../../environments/environment'
import {COUNTER_KEY, PRODUCT_KEY, counterReducer, CounterState, ProductState, productReducer} from './counter';

export interface State {
  [COUNTER_KEY]: CounterState,
  [PRODUCT_KEY]: ProductState
}

export const reducers: ActionReducerMap<State> = {
  [COUNTER_KEY]: counterReducer,
[PRODUCT_KEY]: productReducer
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
