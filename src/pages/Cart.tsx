import { CartApi } from '@/api'
import React, { JSX } from 'react'
import { FlexContainer, Typography } from '@/components/atoms'
import { useQuery } from '@tanstack/react-query'
import { CartSummary, EmptyCart } from '@/components/molecules'
import { IProduct } from '@/api/types'
import { ICartSummarySingleProductProps } from '@/types/molecules'

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
      // Simulate Delaying the API response for 2 seconds (dev purpose only)
      await new Promise((resolve) => setTimeout(resolve, 2000))
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

  // -------------- ERROR HANDLING
  if (apiData?.error && apiData?.error !== null)
    return (
      <FlexContainer
        flexContainerId="cart-page"
        wrap="nowrap"
        direction="column"
        justify="center"
        align="center"
        gap={2}
        className="h-[80dvh] w-full"
      >
        <EmptyCart
          cartError={apiData?.error as string}
          cartMessage="Your cart is empty"
        />
      </FlexContainer>
    )

  // -------------- LOADING HANDLING
  if (isPending) {
    return (
      <FlexContainer
        flexContainerId="cart-page"
        wrap="nowrap"
        direction="column"
        justify="center"
        align="center"
        gap={2}
        className="h-[80dvh] w-full"
      >
        Loading...
      </FlexContainer>
    )
  }

  return (
    <FlexContainer
      flexContainerId="cart-page"
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      align="flex-start"
      gap={2}
      className="h-[80dvh] w-full"
    >
      {/* EMPTY CART */}

      {/* CART TABS (must become an Atom) */}
      <FlexContainer
        flexContainerId="cart-tabs"
        direction="row"
        justify="center"
        align="center"
        gap={2}
        className="w-full  p-2"
      >
        {apiData?.data?.carts.map((_, index: number) => (
          <button
            key={index}
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                activeTab: index
              }))
            }
            className={`px-4 py-2 ${
              state.activeTab === index
                ? 'bg-primary_yellow_500 text-primary_black_500'
                : 'bg-gray-200 text-primary_black_500'
            } rounded-lg`}
          >
            <Typography
              tagAs="span"
              weight="regular"
              textColor="text-primary_black_500"
              text={`Cart ${index + 1}`}
            />
          </button>
        ))}
      </FlexContainer>
      {/* SINGOLA TAB (Organismo CartTab) */}
      <FlexContainer
        flexContainerId="cart-content"
        direction="row"
        justify="space-between"
        align="flex-start"
        gap={4}
        wrap="nowrap"
        className="w-full p-4"
      >
        {/* CART SUMMARY */}
        <CartSummary
          cartId={1}
          cartProducts={
            apiData?.data?.carts[state.activeTab]
              ?.products as ICartSummarySingleProductProps[]
          }
        />
        {/* CART CHECKOUT */}
        <FlexContainer
          flexContainerId="cart-checkout"
          direction="row"
          justify="flex-start"
          align="flex-start"
          wrap="nowrap"
          className="h-fit w-[30%] relative z-10 bg-white shadow-lg rounded-lg p-6"
          style={{
            boxShadow:
              '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
          }}
        >
          LEFT SIDE
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

export default Cart
