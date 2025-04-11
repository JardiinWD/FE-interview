// ------------ COMMON ERROR API LAYER
export type TPromiseError = string | unknown | null | Error

// ------------ COMMON STATUS API LAYER
export type TPromiseStatus = 'success' | 'error'

// ------------
// ------------ CART DATA
// ------------

export interface ICart {
  id: number
  products: Partial<IProduct>[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
  isDeleted: boolean
  deletedOn: string // ISO date string
}

export interface ICartData {
  carts: ICart[]
  total: number
  skip: number
  limit: number
}

// ------------ CART PROMISE
export interface ICartPromise {
  data: ICartData | []
  error: TPromiseError
  status: TPromiseStatus
}

// ------------ CART API CALL CONTEXT
export type TCartApiContext =
  | 'getCarts'
  | 'getCartById'
  | 'getCartByUserId'
  | 'addCart'
  | 'updateCart'
  | 'deleteCart'

// ------------ CART API LAYER
export interface ICartApi {
  getCarts: () => Promise<ICartPromise>
  // TODO : Remove optional cases, now for developing purpose
  getCartById?: (id: number) => Promise<ICartPromise>
  getCartByUserId?: (userId: number) => Promise<ICartPromise>
  addCart?: (cart: Partial<ICart>) => Promise<ICartPromise>
  updateCart?: (id: number, cart: Partial<ICart>) => Promise<ICartPromise>
  deleteCart?: (id: number) => Promise<ICartPromise>
  handleCartErrors: (
    error: TPromiseError,
    context: TCartApiContext
  ) => Promise<ICartPromise>
}

// ------------
// ------------ PRODUCT DATA
// ------------
export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string // ISO date string
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    barcode: string
    qrCode: string
  }
  thumbnail: string
  images: string[]
}

export interface IProductData {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

// ------------ PRODUCT PROMISE
export interface IProductPromise {
  data?: IProductData
  error?: TPromiseError
  status?: TPromiseStatus
}

// ------------ CART API CALL CONTEXT
export type TProductApiContext = 'getProducts'

// ------------ CART API LAYER
export interface IProductApi {
  getProducts: () => Promise<IProductPromise>
  handleProductErrors: (
    error: TPromiseError,
    context: TProductApiContext
  ) => Promise<IProductPromise>
  // TODO : Remove optional cases, now for developing purpose
  getProductById?: (id: number) => Promise<IProductPromise>
  getProductsByCategory?: (category: string) => Promise<IProductPromise>
  // TODO : To implement search and filter
}
