import { IAuthData, ICart, IProduct, IProductReview } from '@/api/types'
import { ICartSummarySingleProductProps } from './molecules'

// -------------
// ------------- PRODUCT
// -------------
export interface ISingleProductProps {
  product: IProduct
}

export interface IReviewsCarouselProps {
  reviews: IProductReview[]
}

// -------------
// -------------  CART
// -------------
export interface ISingleCartProps {
  cartProducts: ICartSummarySingleProductProps[] | ICart[]
  cartCheckoutData: ICart
  cartId?: number
}

// -------------
// -------------  USER
// -------------

export interface ISingleUserInfo {
  userData: IAuthData
}
