import { CartApi } from '@/api'
import { Lotties } from '@/assets/lotties'
import { Button, Spinner, Typography } from '@/components/atoms'
import { useAuthStore, useCartStore } from '@/store'
import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import React, { JSX } from 'react'
import { Link } from 'react-router-dom'

interface IState {
  activeTab: number
}

/**
 * @description CartHeaderIcon component for the header
 * @returns {JSX.Element}
 */
const CartHeaderIcon: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state] = React.useState<IState>({
    activeTab: 0
  })

  // -------------- ZUSTAND STORE
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

  // -------------- CART DATA
  const tabCartTotalQuantity = cartData?.[state.activeTab].totalQuantity

  // -------------- API DATA
  const tabApiTotalQuantity =
    apiData?.data?.carts[state.activeTab].totalQuantity

  return (
    <Link to="/cart">
      <Button
        variant="secondary"
        buttonType="button"
        className="bg-white relative"
        buttonId="cart-button"
      >
        <Lottie
          className="h-[2rem] w-[2rem]"
          animationData={Lotties.CartLottie}
          loop
          autoplay
        />
        {/* Cart Quantity */}
        {(tabApiTotalQuantity ?? tabCartTotalQuantity) && (
          <Box
            className="absolute top-[-0.5rem] right-[-1rem] bg-red-500 rounded-lg"
            width={7}
            height={7}
          >
            {isPending ? (
              <Spinner width="0.5rem" height="0.5rem" />
            ) : (
              <Typography
                textId="cart-quantity"
                text={(
                  (tabApiTotalQuantity as number) ??
                  (tabCartTotalQuantity as number)
                ).toString()}
                tagAs="span"
                weight="regular"
                textColor={'text-white'}
                className="text-center"
              />
            )}
          </Box>
        )}
      </Button>
    </Link>
  )
}

export default CartHeaderIcon
