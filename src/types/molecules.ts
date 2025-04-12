import { IProduct } from '@/api/types'
import { IPaginationProps } from './atoms'

// -------------
// ------------- PRODUCT LIST
// -------------

export interface IProductsListProps {
  products: IProduct[]
  paginationParams: IPaginationProps
}
