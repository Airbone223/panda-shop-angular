import {createAction, props} from '@ngrx/store'
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_PRICE,
  GET_ORDERS, GET_ORDERS_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_ORDER_FROM_SERVER,
  REMOVE_ORDER_SUCCESS
} from './order-actions-types'
import {Order, Product} from '../../shared/inerfaces'


export const addToCart = createAction(ADD_TO_CART,
  props<{product: Product}>())
export const removeFromCart = createAction(REMOVE_FROM_CART,
  props<{product: Product}>())
export const calculateTotal = createAction(CALCULATE_TOTAL_PRICE)
export const getOrders = createAction(GET_ORDERS)
export const getOrdersSuccess = createAction(GET_ORDERS_SUCCESS,
  props<{allOrders: Order[]}>())
export const removeOrderFromServer = createAction(REMOVE_ORDER_FROM_SERVER,
  props<{id: string}>())
export const removeOrderSuccess = createAction(REMOVE_ORDER_SUCCESS,
  props<{id: string}>())
