import { ProductApi } from '@/api'
import { DataLoop, FlexContainer, Modal } from '@/components/atoms'
import { ProductCard } from '@/components/molecules'
import { useQuery } from '@tanstack/react-query'
import React, { JSX, useState } from 'react'
import { IProductQueryParams } from '@/api/types'
import { useModalStore } from '@/store'

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
    limit: 10,
    skip: 0,
    order: 'asc',
    sortBy: 'id',
    currentPage: 1
  })
    const itemsPerPage = state.limit ?? 10; // Default to 10 if state.limit is undefined

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

  const totalPages = Math.ceil((apiData?.data?.total || 0) / itemsPerPage);

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
      {/* <Typography
        tagAs="h1"
        text={`${isPending ? 'Loading...' : 'Hello World'}`}
        textColor="text-primary_blue_400"
        weight="bold"
        className="text-center"
      /> */}
      {/* PRODUCT IMAGES */}
      {/* TODO: Update with GridContainer */}
      <FlexContainer
        flexContainerId="data-loop"
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
                  console.log(`Adding ${item.title} to cart`)
                  // Pass the item to the modal
                  openProductModal(item)
                }}
                onViewDetails={() =>
                  console.log(`Viewing details for ${item.title}`)
                }
              />
            )
          }}
          eachData={apiData?.data?.products}
        />
      </FlexContainer>
      {/* Pagination Buttons */}
      <FlexContainer
        flexContainerId="pagination-buttons"
        direction="row"
        justify="center"
        align="center"
        gap={2}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setState({ ...state, currentPage: index + 1 })}
            className={`px-4 py-2 ${
              state.currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </FlexContainer>
      {/* MODAL */}
      <Modal
        modalId="product-modal"
        isModalOpen={isProductModalOpen}
      >
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
