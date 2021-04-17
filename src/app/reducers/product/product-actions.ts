import {createAction, props} from '@ngrx/store'
import {Product} from '../../shared/inerfaces'
import {
  GET_ALL,
  GET_ALL_SUCCESS,
  GET_BY_ID,
  GET_BY_ID_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  SET_TYPE
} from './product-actions-types'

export const getAll = createAction(GET_ALL)
export const getAllSuccess = createAction(GET_ALL_SUCCESS,
  props<{products: Product[]}>())
export const getByIdSuccess = createAction(GET_BY_ID_SUCCESS,
  props<{product: Product}>())
export const removeProduct = createAction(REMOVE_PRODUCT,
  props<{id: string}>())
export const removeProductSuccess = createAction(REMOVE_PRODUCT_SUCCESS,
  props<{id: string}>())
export const getById = createAction(GET_BY_ID,
  props<{id: string}>())
export const setType = createAction(SET_TYPE,
  props<{checkedType: string}>())

