import { ICart, IProduct } from '@/api/types'
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
// ------------- CART TABS
// -------------

export interface ICartTabsProps {
  cartData: ICart[]
  activeTab: number
  onClickHandler: (index: number) => void
}

// -------------
// ------------- CART SUMMARY
// -------------

export interface ICartSummarySingleProductProps {
  discountPercentage: ICart['discountPercentage']
  discountedTotal: ICart['discountedTotal']
  id: ICart['id']
  price: ICart['price']
  quantity: ICart['quantity']
  thumbnail: IProduct['thumbnail']
  title: IProduct['title']
  total: ICart['total']
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
