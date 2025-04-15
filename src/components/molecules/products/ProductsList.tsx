/* Per risolvere bug paginazione dando un buon loading e mantenendo i bottoni dove sono */
/* https://codesandbox.io/p/sandbox/react-query-paging-trxxk?file=%2Fsrc%2FApp.tsx%3A49%2C30 */

import { Card, DataLoop, FlexContainer, Pagination } from '@/components/atoms'
import { IProductsListProps } from '@/types/molecules'
import React, { useState } from 'react'
import { EmptyCard, Filters, LoadingState } from '@/components/molecules'

// -------------- INTERFACES
interface IState {
  searchProductName?: string
  category?: string
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
  isLoadingList = false,
  allCategories
}) => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    searchProductName: '',
    category: ''
  })

  // -------------- FILTERING
  const filteredProducts = products.filter((product) => {
    // Check if the product matches the search term and category
    const matchesSearch = product.title
      .toLowerCase()
      .includes((state?.searchProductName || '').toLowerCase())
    // Check if the product matches the selected category
    const matchesCategory =
      state.category === '' || product.category === state.category
    return matchesSearch && matchesCategory
  })

  // -------------- PAGINATION UPDATES
  const itemsPerPage = 10 // Numero di prodotti per pagina
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) // Calcola il numero totale di pagine
  const startIndex = (paginationParams.currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // -------------- HANDLERS
  const handleClearFilters = () => {
    setState((prevState) => ({
      ...prevState,
      searchProductName: '',
      category: ''
    }))
  }

  return (
    <div className="w-full">
      {/* FILTERS */}
      <Filters
        onCategorySelect={(category) =>
          setState((prevState) => ({
            ...prevState,
            category: category
          }))
        }
        categories={allCategories}
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
        justify={`center`}
        align={`center`}
        className={`w-full ${filteredProducts.length <= 0 ? 'h-[50dvh]' : 'h-fit'}`}
        gap={4}
      >
        {filteredProducts.length === 0 && !isLoadingList && (
          <EmptyCard
            onClickHandler={handleClearFilters}
            buttonText="Ricomincia"
            cardMessage="Prodotto non Trovato!"
            cardError={`La ricerca non ha portato alcun risultato, questi sono i prodotti filtrati -> ${filteredProducts.length}`}
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
    </div>
  )
}

export default ProductsList
