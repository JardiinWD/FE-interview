import { ProductApi } from '@/api'
import { IProduct, IProductQueryParams } from '@/api/types'
import { FlexContainer, Spinner } from '@/components/atoms'
import { EmptyCard, ProductsList } from '@/components/molecules'
import { useAuthStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import React, { JSX, useState } from 'react'

// -------------- INTERFACES
interface IState {
  limit: IProductQueryParams['limit']
  skip: IProductQueryParams['skip']
  order: IProductQueryParams['order']
  sortBy: IProductQueryParams['sortBy']
  currentPage?: number
}

const Home: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    limit: 8,
    skip: 0,
    order: 'asc',
    sortBy: 'id',
    currentPage: 1
  })
  const itemsPerPage = state.limit ?? 9 // Default to 10 if state.limit is undefined

  // -------------- ZUSTAND STORE

  const { userId } = useAuthStore()

  // -------------- API CALL
  const {
    isPending,
    data: apiData,
    refetch
  } = useQuery({
    queryKey: [state.currentPage, state.limit, state.order, state.sortBy], // Keeps previous data for 5 seconds
    staleTime: 5000,
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error, status } = await ProductApi.getProducts({
        limit: state.limit,
        skip: (state.currentPage! - 1) * (state.limit ?? 10),
        order: state.order,
        sortBy: state.sortBy
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
  if (isPending) {
    return (
      <FlexContainer
        flexContainerId="product-page"
        wrap="nowrap"
        direction="column"
        justify="center"
        align="center"
        gap={2}
        className="h-[80dvh] w-full"
      >
        <Spinner />
      </FlexContainer>
    )
  }

  // -------------- ERROR HANDLING
  if (apiData?.error && apiData?.error !== null)
    return (
      <FlexContainer
        flexContainerId="product-page"
        wrap="nowrap"
        direction="column"
        justify="center"
        align="center"
        gap={2}
        className="h-[80dvh] w-full"
      >
        <EmptyCard
          onClickHandler={refetch}
          cardError={apiData?.error as string}
          cardMessage="Ops! Something went wrong"
          buttonText="Try Again"
        />
      </FlexContainer>
    )

  const totalPages = Math.ceil((apiData?.data?.total || 0) / itemsPerPage)

  return (
    <FlexContainer
      flexContainerId="homepage"
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      align="center"
      gap={2}
      className="h-screen"
    >
      {/* PRODUCTS */}
      <ProductsList
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
        products={apiData?.data?.products as IProduct[]}
      />
    </FlexContainer>
  )
}

export default Home
