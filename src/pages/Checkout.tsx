import React, { JSX, useEffect, useState } from 'react'
import { useLoadingDelay } from '@/hooks'
import { Link, Navigate, redirect, useLocation } from 'react-router-dom'
import { ErrorState, LoadingState } from '@/components/molecules'
import { Button, FlexContainer, Typography } from '@/components/atoms'
import { Box } from '@chakra-ui/react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { useCartStore } from '@/store'

// -------------- INTERFACES
interface IState {
  showCongratulationEffect: boolean
}

const Checkout: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    showCongratulationEffect: false
  })

  // -------------- CUSTOM HOOK
  const isLoading = useLoadingDelay(2000)
  const { width, height } = useWindowSize()
  // -------------- ZUSTAND STORE
  const { clearCart } = useCartStore()

  // -------------- USE EFFECT
  useEffect(() => {
    // Wait for the loading to finish
    if (!isLoading) {
      // Clear the cart
      clearCart()

      // Set the congratulation effect to true
      setState((prevState) => ({
        ...prevState,
        showCongratulationEffect: true
      }))
    }
  }, [isLoading, clearCart])

  // -------------- LOADING STATE
  if (isLoading) return <LoadingState containerId="user-info" />

  return (
    <FlexContainer
      className="lg:p-4 p-6 w-full xs:h-[90dvh] sm:h-[95dvh] md:h-[90dvh] lg:w-[70%] mx-auto overflow-x-hidden"
      gap={5}
      as="section"
      flexContainerId="checkout-page"
      direction="column"
      justify="center"
      align="center"
    >
      {state.showCongratulationEffect && (
        <Confetti width={width} height={height} />
      )}
      <Box
        width={['100%', '100%', '70%', '50%']}
        height={['50%', '50%', '70%', '50%']}
        padding={4}
        borderRadius="md"
        boxShadow="md"
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        id="checkout-box"
      >
        {/* Congratulation Heading */}
        <Typography
          tagAs="h2"
          text="Thank you for your order!"
          textColor="text-primary_black_600"
          weight="bold"
          className="text-center mb-4"
        />
        {/* Congratulation Message */}
        <Typography
          weight="regular"
          tagAs="p"
          text="Your order has been successfully placed. You will receive a confirmation email shortly."
          textColor="text-primary_black_600"
          className="text-center mb-4 w-[80%]"
        />
        {/* Go back button */}
        <Link to="/">
          <Button
            variant="primary"
            buttonId="purchase-button"
            buttonType="button"
          >
            <Typography
              textId="empty-cart-button"
              tagAs="p"
              weight="bold"
              text={'Go back to shopping'}
              textColor="text-primary_black_500"
            />
          </Button>
        </Link>
      </Box>
    </FlexContainer>
  )
}

export default Checkout
