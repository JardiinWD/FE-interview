import { ProductApi } from '@/api'
import { IProduct, IProductQueryParams } from '@/api/types'
import { FlexContainer } from '@/components/atoms'
import { ErrorState, LoadingState, ProductsList } from '@/components/molecules'
import { useQuery } from '@tanstack/react-query'
import React, { JSX, useState } from 'react'

// -------------- INTERFACES
interface IState {
  limit: IProductQueryParams['limit']
  currentPage?: number
  searchProductName?: string
  category?: string
}

const Home: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    limit: 8,
    currentPage: 1,
    searchProductName: '',
    category: ''
  })

  // -------------- API CALL
  const {
    isPending,
    data: apiData,
    refetch
  } = useQuery({
    queryKey: ['products'],
    staleTime: 5000,
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error, status } = await ProductApi.getProducts({
        limit: 1000
      })
      // Return the necessary data
      return {
        data: data,
        error: error,
        status: status
      }
    }
  })

  // -------------- LOADING HANDLING
  if (isPending) return <LoadingState containerId="home" />

  // -------------- ERROR HANDLING
  if (apiData?.error && apiData?.error !== null)
    return (
      <ErrorState
        containerId="home"
        errorDevMessage={apiData?.error as string}
        onClickHandler={refetch}
        errorMessage="Ops! Something went wrong"
        buttonText="Try Again"
      />
    )

  // -------------- Apply filtering to ALL products first
  const allProducts = apiData?.data?.products || []

  const filteredProducts = allProducts.filter((product) => {
    // Check if the product matches the search term
    const matchesSearch = product.title
      .toLowerCase()
      .includes((state?.searchProductName || '').toLowerCase())

    // Check if the product matches the selected category
    const matchesCategory =
      state.category === '' || product.category === state.category

    return matchesSearch && matchesCategory
  })

  // -------------- Then apply pagination to filtered products
  const startIndex = ((state?.currentPage ?? 1) - 1) * (state.limit ?? 10)
  const paginatedFilteredProducts = filteredProducts.slice(
    startIndex,
    startIndex + (state.limit ?? 10)
  )

  // -------------- TOTAL PAGES based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / (state.limit ?? 10))

  // -------------- CATEGORIES from all products
  const allCategories = [...new Set(allProducts.map((p) => p.category))]

  // -------------- HANDLERS for filters
  const handleCategorySelect = (category: string) => {
    setState({
      ...state,
      category,
      currentPage: 1 // Reset to first page when filter changes
    })
  }

  const handleSearchProduct = (searchTerm: string) => {
    setState({
      ...state,
      searchProductName: searchTerm,
      currentPage: 1 // Reset to first page when filter changes
    })
  }

  return (
    <FlexContainer
      flexContainerId="homepage"
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      align="center"
      gap={2}
      className="h-fit lg:w-[70%] w-full p-4 lg:p-0 mx-auto overflow-x-hidden"
    >
      {/* PRODUCTS */}
      <ProductsList
        allCategories={allCategories}
        onCategorySelect={handleCategorySelect}
        onSearchProduct={handleSearchProduct}
        paginationParams={{
          totalPages,
          currentPage: state.currentPage as number,
          onPageChange: (pageNumber) =>
            setState({
              ...state,
              currentPage: pageNumber
            })
        }}
        isLoadingList={isPending}
        products={paginatedFilteredProducts as IProduct[]}
      />
    </FlexContainer>
  )
}

export default Home
