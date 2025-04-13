/* Per risolvere bug paginazione dando un buon loading e mantenendo i bottoni dove sono */
/* https://codesandbox.io/p/sandbox/react-query-paging-trxxk?file=%2Fsrc%2FApp.tsx%3A49%2C30 */

import { DataLoop, FlexContainer, Pagination, Card } from '@/components/atoms'
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
      <FlexContainer
        flexContainerId="product-list"
        direction="row"
        justify="center"
        align="center"
        gap={4}
      >
        <DataLoop
          render={(index, item) => (
            <Card
              product={item}
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={item.images[0]}
            />
          )}
          eachData={products}
        />
      </FlexContainer>
      {/* Pagination */}
      <Pagination
        totalPages={paginationParams.totalPages}
        currentPage={paginationParams.currentPage}
        onPageChange={paginationParams.onPageChange}
      />
    </React.Fragment>
  )
}

export default ProductsList
