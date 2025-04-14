import { IAuthData, ICart, IProduct } from '@/api/types'
import { IPaginationProps } from '@/types/atoms'
import { TLoginFormValues } from '@/types/schema'

// -------------
// ------------- LOGIN FORM
// -------------

export interface ILoginFormProps {
  onSubmit: (data: TLoginFormValues) => void
  formId?: string
  authenticationError?: string
}

// -------------
// ------------- PRODUCT LIST
// -------------

export interface IProductsListProps {
  products: IProduct[]
  paginationParams: IPaginationProps
  isLoadingList: boolean
}

// -------------
// ------------- CART
// -------------

export interface ICartTabsProps {
  cartData: ICart[]
  activeTab: number
  onClickHandler: (index: number) => void
}

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

export interface ICartSummaryProductInfoProps {
  item: ICartSummarySingleProductProps
  index: number
}

export interface ICartSummaryProductPriceProps
  extends ICartSummaryProductInfoProps {}

export interface ICartSummaryProps {
  cartProducts: ICartSummarySingleProductProps[]
  cartId: number
}

export interface ICartCheckoutProps {
  cartCheckoutData: ICart
}

export interface IEmptyCardProps {
  cardMessage?: string
  cardError?: string
  buttonText?: string
  onClickHandler?: () => void
}

// -------------
// ------------- STATE
// -------------

export interface ILoadingStateProps {
  containerClassName?: string
  containerId?: string
}

export interface IErrorStateProps {
  errorMessage: string
  buttonText?: string
  onClickHandler?: () => void
  containerClassName?: string
  errorDevMessage?: string
  containerId?: string
}

// -------------
// ------------- USER INFO
// -------------

export interface IUserAdditionalInfo {
  userData: IAuthData
}
