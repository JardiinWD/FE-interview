import { Card, DataLoop, FlexContainer, Pagination } from '@/components/atoms'
import { IProductsListProps } from '@/types/molecules'
import React from 'react'
import { EmptyCard, Filters, LoadingState } from '@/components/molecules'

/**
 * @description display a list of products with pagination and add to cart functionality
 * @param {IProduct[]} products - array of filtered and paginated products to display
 * @param {boolean} isLoadingList - flag to show loading state
 * @param {IPaginationProps} paginationParams - pagination parameters
 * @param {string[]} allCategories - all available categories for filtering
 * @param {Function} onCategorySelect - handler for category selection
 * @param {Function} onSearchProduct - handler for product search
 * @returns {JSX.Element} The ProductsList component
 */
const ProductsList: React.FC<IProductsListProps> = ({
  products,
  paginationParams,
  isLoadingList = false,
  allCategories,
  onCategorySelect,
  onSearchProduct
}) => {
  // -------------- HANDLERS
  const handleClearFilters = () => {
    if (onCategorySelect) onCategorySelect('')
    if (onSearchProduct) onSearchProduct('')
  }

  return (
    <div
      data-testid="products-list"
      className={`w-full ${products.length <= 0 ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
    >
      {/* FILTERS */}
      <Filters
        onCategorySelect={onCategorySelect}
        categories={allCategories}
        onSearchProduct={onSearchProduct}
      />
      <FlexContainer
        flexContainerId="product-list"
        direction="row"
        justify={`center`}
        align={`flex-start`}
        className={`w-full ${products.length <= 0 ? 'h-[40dvh]' : 'min-h-full'}`}
        gap={4}
      >
        {products.length === 0 && !isLoadingList && (
          <EmptyCard
            onClickHandler={handleClearFilters}
            buttonText="Restart"
            cardMessage="Product Not Found!"
            cardError={`The search did not return any results, these are the filtered products -> ${products.length}`}
          />
        )}
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
            eachData={products}
          />
        )}
      </FlexContainer>
      {/* Pagination */}
      {products.length !== 0 && (
        <Pagination
          totalPages={paginationParams.totalPages}
          currentPage={paginationParams.currentPage}
          onPageChange={paginationParams.onPageChange}
        />
      )}
    </div>
  )
}

export default ProductsList
