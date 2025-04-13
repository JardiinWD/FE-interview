import { CartApi } from '@/api'
import React, { JSX } from 'react'
import { FlexContainer } from '@/components/atoms'
import { useQuery } from '@tanstack/react-query'

// -------------- INTERFACES

interface IState {
  userId: number
  activeTab: number
}

const Cart: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = React.useState<IState>({
    userId: 33, // TODO : For now it's hardcoded, later it will be dynamic with authentication and stored within zustand persist context (and it won't be a state variables)
    activeTab: 0
  })

  // -------------- API CALL
  const { isPending, data: apiData } = useQuery({
    queryKey: [state.userId], // Keeps previous data for 5 seconds
    staleTime: 5000,
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error, status } = await CartApi.getCartByUserId(
        state.userId
      )
      // Return the necessary data
      return {
        data: data,
        error: error,
        status: status
      }
    }
  })

  console.log('apiData', apiData)

  return (
    <FlexContainer
      flexContainerId="cart-page"
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      align="center"
      gap={2}
      className="h-screen"
    >
      {/* TODO */}
      {/* X TABS FOR EVERY DATA.CARTS AVAILABLE */}
      <FlexContainer
        flexContainerId="cart-tabs"
        direction="row"
        justify="center"
        align="center"
        gap={2}
        className="w-full bg-gray-100 p-2"
      >
        {apiData?.data?.carts.map((_, index: number) => (
          <button
            key={index}
            onClick={() => setState({ ...state, activeTab: index })}
            className={`px-4 py-2 ${
              state.activeTab === index
                ? 'bg-primary_yellow_500 text-white'
                : 'bg-gray-200 text-black'
            } rounded-lg`}
          >
            Cart {index + 1}
          </button>
        ))}
      </FlexContainer>
      <FlexContainer
        flexContainerId="cart-content"
        direction="column"
        justify="flex-start"
        align="center"
        gap={2}
        className="w-full p-4"
      >
        {apiData?.data?.carts[state.activeTab]?.products.map(
          (item: any, index: number) => (
            <div key={index} className="w-full p-2 border-b">
              <h4>{item.productName}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          )
        )}
      </FlexContainer>
    </FlexContainer>
  )
}

export default Cart
