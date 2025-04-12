import { ICart, IProduct } from '@/api/types'
import { JSX, ReactNode } from 'react'

// -------------
// ------------- TYPOGRAPHY
// -------------

// --> Possible tag names
export type TTypographyTagName = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
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
  textColor?: string
  textLineHeight?: string
  weight: TTypographyWeight
  text: string
  className?: string
  style?: React.CSSProperties
  uppercase?: boolean
  htmlString?: string
  whiteSpace?: boolean
}

// -------------
// ------------- GRID CONTAINER
// -------------

export interface IGridContainerProps {
  children: React.ReactNode
  templateColumns: string
  templateRows: string
  templateAreas?: string
  gap: string
  rowGap?: string
  columnGap?: string
  className?: string
}

// -------------
// ------------- FLEX CONTAINER
// -------------

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
}

// -------------
// ------------- LOOP
// -------------

export interface IDataLoopProps<T extends IProduct | ICart> {
  render?: (index: number, item: T) => ReactNode
  eachData?: T[]
  fallback?: ReactNode
}

// -------------
// ------------- PRODUCT CARD
// -------------

// --> Product card props
export interface IProductCardProps {
  title?: IProduct['title']
  description?: IProduct['description']
  imageSrc?: IProduct['images'][0]
  onAddToCart?: () => void
  onViewDetails?: () => void
}

// -------------
// ------------- BUTTON
// -------------

// --> Possible button variants
export type TButtonVariant = 'primary' | 'secondary'
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
