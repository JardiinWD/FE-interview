import { IProduct } from '@/api/types'
import { IPaginationProps } from './atoms'

// -------------
// ------------- PRODUCT LIST
// -------------

export interface IProductsListProps {
  products: IProduct[]
  paginationParams: IPaginationProps
  isLoadingList: boolean
}

// -------------
// ------------- CART SUMMARY
// -------------

export interface ICartSummarySingleProductProps {
  discountPercentage: number
  discountedTotal: number
  id: number
  price: number
  quantity: number
  thumbnail: string
  title: string
  total: number
}

export interface ICartSummaryProps {
  cartProducts: ICartSummarySingleProductProps[]
  cartId: number
}

// -------------
// ------------- EMPTY CART
// -------------

export interface IEmptyCartProps {
  cartMessage?: string
  cartError?: string
}
