import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store'
import {ProductState} from '../../shared/inerfaces'
import {getAll, getAllSuccess, getById, getByIdSuccess, removeProduct, removeProductSuccess, setType} from './product-actions'

export const ProductInitialState: ProductState = {
  product: null,
  products: null,
  loading: true,
  type: 'All'
}

export const PRODUCT_KEY = 'products'

export const productReducer = createReducer(
  ProductInitialState,
  on(getAll, state => ({
    ...state,
    loading: true
  })),
  on(getAllSuccess, (state, action) => ({
    ...state,
    products: action?.products,
    loading: false
  })),
  on(getById, state => ({
    ...state,
    loading: true
    })),
  on(getByIdSuccess, (state, action) => ({
    ...state,
    product: action?.product,
    loading: false
  })),
  on(setType, (state, action) => ({
    ...state,
    type: action.checkedType
  })),
  on(removeProduct, state => ({
    ...state
  })),
  on(removeProductSuccess, (state, action) => ({
  ...state,
  products: state.products.filter(item => item.id !== action.id)
  }))
)

export const featureProductSelector = createFeatureSelector<ProductState>(PRODUCT_KEY)
export const productsSelector = createSelector(
  featureProductSelector,
  state => state.products
)
export const loadingSelector = createSelector(
  featureProductSelector,
  state => state.loading
)
export const productSelector = createSelector(
  featureProductSelector,
  state => state.product
)
export const typeSelector = createSelector(
  featureProductSelector,
  state => state.type
)

