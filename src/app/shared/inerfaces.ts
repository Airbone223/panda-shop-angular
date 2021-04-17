export interface Product {
  type?: string,
  id?: string,
  title?: string,
  price?: string,
  photo?: string,
  photoBack?: string,
  info?: string,
  date?: Date
}

export interface User {
  email?: string,
  password?: string
}

export interface FbResponse {
  name: string,
  date?: Date
}

export interface Order {
  id?: string,
  cart?: Product[]
  name?: string,
  phone?: string,
  address?: string,
  payment?: string,
  price?: number,
  date?: Date
}





export interface ProductState {
  type: string,
  product: Product,
  products: Product[],
  loading: boolean
}


export interface OrderState {
  allOrders: Order[],
  totalPrice: number,
  cart: Product[],
  loading: boolean
}
