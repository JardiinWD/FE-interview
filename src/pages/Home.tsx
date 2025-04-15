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
}

const Home: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    limit: 6,
    currentPage: 1
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
      const { data, error } = await ProductApi.getProducts({ limit: 1000 })
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

  // -------------- LOCAL PAGINATION
  const startIndex = ((state?.currentPage ?? 1) - 1) * (state.limit ?? 10)
  const paginatedProducts = apiData?.data?.products.slice(
    startIndex,
    startIndex + (state.limit ?? 10)
  ) // Slice dei prodotti per pagina
  const totalPages = Math.ceil(
    (apiData?.data?.products?.length ?? 0) / (state.limit ?? 10)
  )

  // -------------- CATEGORIES
  const allCategories = [
    ...new Set(apiData?.data?.products.map((p) => p.category))
  ]

  return (
    <FlexContainer
      flexContainerId="homepage"
      wrap="nowrap"
      direction="column"
      justify="center"
      align="center"
      gap={2}
      className="h-screen w-[90%] max-w-[90%] mx-auto overflow-hidden"
    >
      {/* PRODUCTS */}
      <ProductsList
        allCategories={allCategories}
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
        products={paginatedProducts as IProduct[]}
      />
    </FlexContainer>
  )
}

export default Home
