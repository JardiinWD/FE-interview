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
}

const Home: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    limit: 10,
    skip: 0,
    order: 'asc',
    sortBy: 'id'
  })

  // -------------- ZUSTAND STORE
  const { openProductModal } = useModalStore()

  // -------------- API CALL
  const { isPending, data: apiData } = useQuery({
    queryKey: [''],
    staleTime: 5000, // Keeps previous data for 5 seconds
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error, status } = await ProductApi.getProducts({
        limit: state.limit,
        skip: state.skip,
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
      {/* MODAL */}
      <Modal
        hasModalHeader={false}
        hasModalFooter={false}
        hasModalCloseButton={true}
        hasModalOverlay={true}
        modalId="product-modal"
        modalBody={<div>Product Modal</div>}
        modalHeader={<div>Product Header</div>}
        modalFooter={<div>Product Footer</div>}
      />
    </FlexContainer>
  )
}

export default Home
