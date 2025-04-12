import {
  DataLoop,
  FlexContainer,
  Pagination,
  ProductCard
} from '@/components/atoms'
import { IProductsListProps } from '@/types/molecules'
import React from 'react'

/**
 * @description display a list of products with pagination and add to cart functionality
 * @param {IProduct[]} products - array of products to display
 * @param {(product: IProduct) => void} onAddToCart - function to call when a product is added to the cart
 * @param {IPaginationProps} paginationParams - pagination parameters
 * @returns
 */
const ProductsList: React.FC<IProductsListProps> = ({
  products,
  paginationParams
}) => {
  return (
    // Aggiungere qua onAddToCart

    <React.Fragment>
      {/* Product List */}
      <FlexContainer
        flexContainerId="product-list"
        direction="row"
        justify="center"
        align="center"
        gap={2}
      >
        <DataLoop
          render={(index, item) => {
            return (
              <ProductCard
                key={index}
                title={item.title}
                description={item.description}
                imageSrc={item.images[0]}
                onAddToCart={() => {
                  // Pass the item to the modal
                  console.log(`Adding ${item.title} to cart`)
                }}
              />
            )
          }}
          eachData={products}
        />
      </FlexContainer>
      {/* Pagination */}
      <Pagination
        totalPages={paginationParams.totalPages} // Assuming 10 items per page
        currentPage={paginationParams.currentPage} // Replace with your current page state
        onPageChange={paginationParams.onPageChange}
      />
    </React.Fragment>
  )
}

export default ProductsList
