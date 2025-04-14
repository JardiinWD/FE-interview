/* Per risolvere bug paginazione dando un buon loading e mantenendo i bottoni dove sono */
/* https://codesandbox.io/p/sandbox/react-query-paging-trxxk?file=%2Fsrc%2FApp.tsx%3A49%2C30 */

import { Card, DataLoop, FlexContainer, Pagination } from '@/components/atoms'
import { IProductsListProps } from '@/types/molecules'
import React, { useState } from 'react'
import { Filters, LoadingState } from '@/components/molecules'

// -------------- INTERFACES
interface IState {
  searchProductName?: string
}

/**
 * @description display a list of products with pagination and add to cart functionality
 * @param {IProduct[]} products - array of products to display
 * @param {(product: IProduct) => void} onAddToCart - function to call when a product is added to the cart
 * @param {boolean} isLoadingList - flag to show loading state
 * @param {IPaginationProps} paginationParams - pagination parameters
 * @returns
 */
const ProductsList: React.FC<IProductsListProps> = ({
  products,
  paginationParams,
  isLoadingList = false
}) => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    searchProductName: ''
  })

  // -------------- FILTERING
  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(state.searchProductName?.toLowerCase() ?? '')
  )

  return (
    <React.Fragment>
      {/* FILTERS */}
      <Filters
        onSearchProduct={(searchTerm) =>
          setState((prevState) => ({
            ...prevState,
            searchProductName: searchTerm
          }))
        }
      />
      <FlexContainer
        flexContainerId="product-list"
        direction="row"
        justify="center"
        align="center"
        gap={4}
      >
        {/* FILTER AND RESEARCH */}
        {isLoadingList ? (
          <LoadingState containerId="home" />
        ) : (
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
            eachData={filteredProducts}
          />
        )}
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
