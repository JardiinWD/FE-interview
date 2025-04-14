import { IAuthData, ICart, IProduct } from '@/api/types'
import { ICartSummarySingleProductProps } from './molecules'

// -------------
// ------------- SINGLE PRODUCT
// -------------
export interface ISingleProductProps {
  product: IProduct
}

// -------------
// ------------- SINGLE CART CARD
// -------------
export interface ISingleCartProps {
  cartProducts: ICartSummarySingleProductProps[]
  cartCheckoutData: ICart
  cartId?: number
}

// -------------
// ------------- SINGLE USER CARD
// -------------

export interface ISingleUserInfo {
  userData: IAuthData
}
