import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store'
import {OrderState} from '../../shared/inerfaces'
import {
  addToCart,
  calculateTotal,
  getOrders,
  getOrdersSuccess,
  removeFromCart,
  removeOrderFromServer,
  removeOrderSuccess
} from './order-actions'


export const OrderInitialState: OrderState = {
  allOrders: [],
  cart: [],
  totalPrice: 0,
  loading: true,
}

export const ORDER_KEY = 'order'

export const orderReducer = createReducer(
  OrderInitialState,

  on(addToCart, (state, action) => ({
    ...state,
    cart: [...state.cart, action.product]
  })),
  on(removeFromCart, (state, action) => ({
    ...state,
    cart: state.cart.filter(item => item.id !== action.product.id)
  })),
  on(calculateTotal, state => ({
    ...state,
    totalPrice: state.cart.reduce((total, item) => total += +item.price, 0)
  })),
  on(getOrdersSuccess, (state, action) => ({
    ...state,
    allOrders: action.allOrders,
    loading: false
  })),
  on(getOrders, state => ({
    ...state,
    loading: true
  })),
  on(removeOrderFromServer, state => ({
    ...state
  })),
  on(removeOrderSuccess, (state, action) => ({
    ...state,
    allOrders: state.allOrders.filter(item => item.id !== action.id)
  }))
)

export const featureOrderSelector = createFeatureSelector<OrderState>(ORDER_KEY)
export const loadingSelector = createSelector(
  featureOrderSelector,
  state => state.loading
)
export const cartSelector = createSelector(
  featureOrderSelector,
  state => state.cart
)
export const totalPriceSelector = createSelector(
  featureOrderSelector,
  state => state.totalPrice
)
export const allOrdersSelector = createSelector(
  featureOrderSelector,
  state => state.allOrders
)

