import { ProductApi } from '@/api'
import { IProduct, IProductQueryParams } from '@/api/types'
import { FlexContainer, Modal } from '@/components/atoms'
import { ProductsList } from '@/components/molecules'
import { useModalStore } from '@/store'
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
    limit: 9,
    skip: 0,
    order: 'asc',
    sortBy: 'id',
    currentPage: 1
  })
  const itemsPerPage = state.limit ?? 9 // Default to 10 if state.limit is undefined

  // -------------- ZUSTAND STORE
  const { openProductModal } = useModalStore()
  const isProductModalOpen = useModalStore.getState().isProductModalOpen

  // -------------- API CALL
  const { isPending, data: apiData } = useQuery({
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

  const totalPages = Math.ceil((apiData?.data?.total || 0) / itemsPerPage)

  console.log('IsPending --> ? ', isPending)

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
          onPageChange: () =>
            setState({
              ...state,
              currentPage: (state.currentPage as number) + 1
            })
        }}
        products={apiData?.data?.products as IProduct[]}
      />

      {/* MODAL */}
      <Modal modalId="product-modal" isModalOpen={isProductModalOpen}>
        <FlexContainer
          flexContainerId="modal-content"
          direction="column"
          justify="center"
          align="center"
          gap={2}
        >
          <h1>Product Modal</h1>
          <p>Product details go here</p>
        </FlexContainer>
      </Modal>
    </FlexContainer>
  )
}

export default Home
