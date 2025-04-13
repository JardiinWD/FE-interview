import { CartApi } from '@/api'
import { ICart } from '@/api/types'
import { FlexContainer } from '@/components/atoms'
import { CartTabs, EmptyCart } from '@/components/molecules'
import { SingleCart } from '@/components/organisms'
import { ICartSummarySingleProductProps } from '@/types/molecules'
import { useQuery } from '@tanstack/react-query'
import React, { JSX } from 'react'

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
        {/* TODO: USE LOADER ATOM INSTEAD */}
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
      <CartTabs
        cartData={apiData?.data?.carts as ICart[]}
        activeTab={state.activeTab}
        onClickHandler={(index: number) =>
          setState((prevState) => ({
            ...prevState,
            activeTab: index
          }))
        }
      />
      <SingleCart
        cartProducts={
          apiData?.data?.carts[state.activeTab]
            ?.products as ICartSummarySingleProductProps[]
        }
        cartId={1}
      />
    </FlexContainer>
  )
}

export default Cart
