import { IAuthData, ICart, IProduct, IProductReview } from '@/api/types'
import { ICartSummarySingleProductProps } from '@/types/molecules'

// -------------
// ------------- PRODUCT
// -------------
export interface ISingleProductProps {
  product: IProduct
}

export interface IReviewsCarouselProps {
  reviews: IProductReview[]
  dataTestId?: string
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
