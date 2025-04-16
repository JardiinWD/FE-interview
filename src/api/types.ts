// ------------ COMMON ERROR API LAYER
export type TPromiseError = string | unknown | null | Error

// ------------ COMMON STATUS API LAYER
export type TPromiseStatus = 'success' | 'error'

// ------------
// ------------ AUTHENTICATION
// ------------

// ------------ AUTHENTICATION DATA
export interface IAuthData {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

// ------------ AUTHENTICATION PROMISE
export interface IAuthPromise {
  data?: IAuthData
  error?: TPromiseError
  status?: TPromiseStatus
}

// ------------ AUTHENTICATION API CALL CONTEXT
export type TAuthApiContext =
  | 'handleLogin'
  | 'getCurrentUser'
  | 'getRefreshToken'

// ------------ AUTHENTICATION API LAYER
export interface IAuthApi {
  handleAuthenticationErrors: (
    error: TPromiseError,
    context: TAuthApiContext
  ) => Promise<IAuthPromise>
  handleLogin: (username: string, password: string) => Promise<IAuthPromise>
  getCurrentUser?: () => Promise<IAuthPromise>
  getRefreshToken?: (refreshToken: string) => Promise<IAuthPromise>
}

// ------------
// ------------ CART
// ------------

// ------------ SINGLE CART
export interface ICart {
  id: number
  products: Partial<IProduct>[]
  total: number
  discountedTotal: number
  discountedPrice?: number
  userId: number
  totalProducts: number
  totalQuantity: number
  isDeleted: boolean
  deletedOn: string
  quantity: number
  discountPercentage: number
  price: number
}

// ------------ CART DATA
export interface ICartData {
  carts: ICart[]
  total: number
  skip: number
  limit: number
}

// ------------ CART PROMISE
export interface ICartPromise {
  data?: ICartData
  error?: TPromiseError
  status?: TPromiseStatus
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
  getCartByUserId: (userId: number) => Promise<ICartPromise>
  addNewCart: (
    userId: number,
    product: Partial<IProduct>
  ) => Promise<ICartPromise>
  handleCartErrors: (
    error: TPromiseError,
    context: TCartApiContext
  ) => Promise<ICartPromise>
}

// ------------
// ------------ PRODUCT DATA
// ------------

export interface IProductDimensions {
  width: number
  height: number
  depth: number
}

export interface IProductReview {
  rating: number
  comment: string
  date: string // ISO date string
  reviewerName: string
  reviewerEmail: string
}

export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  total?: number
  discountedPrice?: number
  discountPercentage: number
  quantity?: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: IProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: IProductReview[]
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

// ------------ PRODUCT API CALL CONTEXT
export type TProductApiContext =
  | 'getProducts'
  | 'getProductById'
  | 'getProductsByCategory'

// ------------ PRODUCT API QUERY PARAMS
export interface IProductQueryParams {
  limit?: number
  skip?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

// ------------ PRODUCT API LAYER
export interface IProductApi {
  getProducts: (queryParams?: IProductQueryParams) => Promise<IProductPromise>
  handleProductErrors: (
    error: TPromiseError,
    context: TProductApiContext
  ) => Promise<IProductPromise>
  getProductById?: (id: number) => Promise<IProductPromise>
  getProductsByCategory: (category: string) => Promise<IProductPromise>
  // TODO : To implement search and filter
}
