import { IProduct } from '@/api/types'
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
  cartId?: number
}
