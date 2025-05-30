import { IAuthData, ICart, IProduct, IProductReview } from '@/api/types'
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
// ------------- PRODUCT
// -------------

export interface IProductsListProps {
  products: IProduct[]
  paginationParams: IPaginationProps
  isLoadingList: boolean
  allCategories: IProduct['category'][]
  onCategorySelect: (category: string) => void
  onSearchProduct: (value: string) => void
}

export interface ISingleReviewProps {
  review: IProductReview
}

export interface IRecommendedProductsProps {
  category: string
}

// -------------
// ------------- CART
// -------------

export interface ICartTabsProps {
  cartData: ICart[]
  activeTab: number
  onClickHandler: (index: number) => void
}

export interface ICartSummarySingleProductProps extends IProduct {
  discountPercentage: ICart['discountPercentage']
  discountedTotal: ICart['discountedTotal']
  discountedPrice?: number
  id: ICart['id']
  price: ICart['price']
  quantity: ICart['quantity']
  thumbnail: IProduct['thumbnail']
  title: IProduct['title']
  total: ICart['total']
}

export interface ICartSummaryProductInfoProps {
  product?: IProduct
  item: ICartSummarySingleProductProps
  index: number
  cartId: number
}

export interface ICartSummaryProductPriceProps
  extends ICartSummaryProductInfoProps { }

export interface ICartSummaryProps {
  cartProducts: ICartSummarySingleProductProps[] | ICart[]
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
  dataTestId?: string
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
  dataTestId?: string
}

// -------------
// ------------- USER INFO
// -------------

export interface IUserAdditionalInfo {
  userData: IAuthData
}

// -------------
// ------------- MODALS
// -------------

export interface ILogoutModalProps {
  modalId?: string
  isModalOpen?: boolean
}

// -------------
// ------------- FILTERS
// -------------
export interface IFiltersProps {
  onSearchProduct: (value: string) => void
  onCategorySelect?: (category: string) => void
  categories: IProduct['category'][]
}
