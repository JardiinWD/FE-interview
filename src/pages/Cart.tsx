import { CartApi } from '@/api'
import { ICart } from '@/api/types'
import { FlexContainer } from '@/components/atoms'
import { CartTabs, ErrorState, LoadingState } from '@/components/molecules'
import { SingleCart } from '@/components/organisms'
import { useAuthStore, useCartStore } from '@/store'
import { ICartSummarySingleProductProps } from '@/types/molecules'
import { useQuery } from '@tanstack/react-query'
import React, { JSX } from 'react'

// -------------- INTERFACES

interface IState {
  activeTab: number
}

const Cart: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = React.useState<IState>({
    activeTab: 0
  })

  // -------------- ZUSTAND
  const { userId } = useAuthStore()
  const { cartData } = useCartStore()

  // -------------- API CALL
  const { isPending, data: apiData } = useQuery({
    queryKey: [userId], // Keeps previous data for 5 seconds
    staleTime: 5000,
    queryFn: async () => {
      // Simulate Delaying the API response for 2 seconds (dev purpose only)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Call the API to get the products and destructure the response
      const { data, error, status } = await CartApi.getCartByUserId(
        userId as number
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
  if (
    apiData?.error &&
    apiData?.error !== null &&
    !cartData?.[state.activeTab]?.products
  ) {
    return (
      <ErrorState
        containerId="cart"
        errorDevMessage={apiData?.error as string}
        errorMessage="Your cart is empty!"
        buttonText="Start Shopping"
      />
    )
  }

  // -------------- LOADING HANDLING
  if (isPending) return <LoadingState containerId="cart" />

  // -------------- CART DATA
  const tabCartData = cartData?.[state.activeTab]?.products as ICart[]
  const tabCartCheckoutInfo = cartData?.[state.activeTab]
  const activeTabCartId = cartData?.[state.activeTab].id

  // -------------- API DATA
  const tabApiData = apiData?.data?.carts[state.activeTab]?.products
  const tabApiCheckoutInfo = apiData?.data?.carts[state.activeTab] as ICart
  const activeTabApiCartId = apiData?.data?.carts[state.activeTab].id

  return (
    <FlexContainer
      flexContainerId="cart-page"
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      align="flex-start"
      gap={2}
      className="min-h-[100dvh] lg:min-h-[80dvh] lg:h-[80dvh] w-full max-w-full p-4 pt-12 lg:pt-20"
    >
      {apiData?.data?.carts && (
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
      )}
      <SingleCart
        cartProducts={
          (tabApiData as ICartSummarySingleProductProps[]) ??
          (tabCartData as ICart[])
        }
        cartId={activeTabApiCartId ?? activeTabCartId}
        cartCheckoutData={tabApiCheckoutInfo ?? tabCartCheckoutInfo}
      />
    </FlexContainer>
  )
}

export default Cart
