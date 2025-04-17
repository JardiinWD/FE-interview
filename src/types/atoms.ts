import { ICart, IProduct } from '@/api/types'
import { JSX, ReactNode } from 'react'
import { ICartSummarySingleProductProps } from '@/types/molecules'

// -------------
// ------------- TYPOGRAPHY
// -------------

// --> Possible tag names
export type TTypographyTagName = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'
>

// --> Possible font weights
export type TTypographyWeight =
  | 'regular'
  | 'medium'
  | 'bold'
  | 'normal'
  | 'light'

// --> Typography props
export interface ITypographyProps {
  tagAs: TTypographyTagName
  textId?: string
  textColor?: string
  textLineHeight?: string
  weight: TTypographyWeight
  text: string
  className?: string
  style?: React.CSSProperties
  uppercase?: boolean
  htmlString?: string
  whiteSpace?: boolean
  htmlFor?: string
  dataTestId?: string
}

// -------------
// ------------- FLEX CONTAINER
// -------------

// --> Possible Options for flex container Tag
export type TFlexContainerTag =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'nav'
  | 'header'
  | 'footer'
// --> Possible flex directions options
export type TFlexContainerDirections = 'row' | 'column'
// --> Possible flex justify content options
export type TFlexContainerJustify =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
// --> Possible flex align items options
export type TFlexContainerAlign =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'stretch'
// --> Possible flex wrap options
export type TFlexContainerWrap = 'wrap' | 'nowrap' | 'wrap-reverse'

export interface IFlexContainerProps {
  children: React.ReactNode
  direction?: TFlexContainerDirections
  justify?: TFlexContainerJustify
  align?: TFlexContainerAlign
  wrap?: TFlexContainerWrap
  gap?: number
  className?: string
  style?: React.CSSProperties
  flexContainerId?: string
  as?: TFlexContainerTag
  dataTestId?: string
}

// -------------
// ------------- IMAGE COMPONENT
// -------------

// --> Possible image fit options
export type TImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

// --> Possible image options
export interface IImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  htmlWidth?: number
  htmlHeight?: number
  fit?: TImageFit
  dataTestId?: string
}

// -------------
// ------------- LOOP
// -------------

export interface IDataLoopProps<
  T extends IProduct | ICart | ICartSummarySingleProductProps
> {
  render?: (index: number, item: T) => ReactNode
  eachData?: T[]
  fallback?: ReactNode
}

// -------------
// ------------- CART
// -------------

export interface ICartActionProps {
  product?: Partial<IProduct>
  isAddToCartVisible?: boolean
  isRemoveFromCartVisible?: boolean
  cart?: Partial<ICart>
  onAddToCart?: (product: Partial<IProduct>, userId: number) => void
  onRemoveFromCart?: (cartId: number, productId: number) => void
  onRetrieveCurrentQuantity?: (quantity: number) => void
  isLoading?: boolean
  containerClassName?: string
  buttonClassName?: string
  counterClassName?: string
  dataTestId?: string
  isAddToCartDisabled?: boolean
  isDecrementDisabled?: boolean
  isIncrementDisabled?: boolean
}

export interface ICartCheckoutItemProps {
  label?: string
  labelClassName?: string
  property?: string
  propertyClassName?: string
  discountPill?: number
}

// -------------
// ------------- PRODUCT
// -------------

export interface ICardProps {
  title?: IProduct['title']
  description?: IProduct['description']
  imageSrc?: IProduct['images'][0]
  product?: IProduct
  onAddToCart?: (product: Partial<IProduct>, userId: number) => void
  dataTestId?: string
}

export interface IDiscountPillProps {
  discountPercentage: number
}

export interface IProductRatingProps {
  rating: number
  starsProps?: {
    width?: string
    height?: string
  }
}

export interface IAdditionalInfoProps {
  info: keyof IProduct | string
  label: string
}

export interface IQuantityCounterProps {
  minValue?: number
  maxValue?: number
  step?: number
  initialValue?: number
  onIncrement?: (value: number) => void
  onDecrement?: (value: number) => void
  onChange?: (value: number) => void
  onRetrieveCurrentQuantity?: (quantity: number) => void
  counterClassName?: string
  isDecrementDisabled?: boolean
  isIncrementDisabled?: boolean
}

export interface ISingleRecommendedProductCardProps {
  product: IProduct
  dataTestId?: string
}

// -------------
// ------------- BUTTON
// -------------

// --> Possible button variants
export type TButtonVariant = 'primary' | 'secondary' | 'tertiary'
// --> Possible button types
export type TButtonType = 'button' | 'submit'

// --> Button props
export interface IButtonProps {
  variant: TButtonVariant
  onClick?: () => void
  children: React.ReactNode
  style?: React.CSSProperties
  buttonType?: TButtonType
  className?: string
  formId?: string
  buttonId?: string
  disabled?: boolean
  isLoading?: boolean
  dataTestId?: string
}

// -------------
// ------------- MODALS
// -------------

export interface IModalProps {
  modalId?: string
  children?: ReactNode
  className?: string
  isModalOpen?: boolean
}

// -------------
// ------------- PAGINATION
// -------------
export interface IPaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
}

// -------------
// ------------- SPINNER
// -------------
export interface ISpinnerProps {
  width?: string
  height?: string
  customColor?: string
}

// -------------
// ------------- FORM INPUT
// -------------

type TFormInputType = 'text' | 'email' | 'password'

export interface IFormInputProps {
  id: string
  label: string
  type?: TFormInputType
  placeholder?: string
  error?: string
  register: ReturnType<any>
  className?: string
  dataTestId?: string
  dataTestIdError?: string
}

// -------------
// ------------- COMMON INPUT
// -------------

export interface IInputProps {
  id: string
  type?: TFormInputType
  placeholder?: string
  boxClassName?: string
  label?: string
  onChange?: (value: string) => void
}

// -------------
// ------------- CATEGORIES DROPDOWN
// -------------
export interface ICategoriesDropdownProps {
  categories: IProduct['category'][]
  onCategorySelect: (category: string) => void
}

// -------------
// ------------- LAZY IMAGE
// -------------
export interface ILazyImageProps {
  alt: string
  src: string
  placeholder?:
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | null
  | undefined
  height?: number
  width?: number
  className?: string
}
