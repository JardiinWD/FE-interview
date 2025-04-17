import { Button, FlexContainer, Typography } from '@/components/atoms'
import { LoadingState } from '@/components/molecules'
import { useLoadingDelay } from '@/hooks'
import { useCartStore } from '@/store'
import { Box } from '@chakra-ui/react'
import React, { JSX, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom'
import { useWindowSize } from 'react-use'

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
      dataTestId="checkout-page"
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
        height={['50%', '50%', '70%', '30%']}
        padding={4}
        borderRadius="md"
        boxShadow="md"
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        id="checkout-box"
        data-testid="checkout-box"
      >
        {/* Congratulation Heading */}
        <Typography
          tagAs="h2"
          text="Thank you for your order!"
          textColor="text-primary_black_600"
          weight="bold"
          className="text-center mb-4"
          textId="checkout-heading"
          dataTestId="checkout-heading"
        />
        {/* Congratulation Message */}
        <Typography
          weight="regular"
          tagAs="p"
          text="Your order has been successfully placed. You will receive a confirmation email shortly."
          textColor="text-primary_black_600"
          className="text-center mb-4 w-[80%]"
          textId="checkout-message"
          dataTestId="checkout-message"
        />
        {/* Go back button */}
        <Link data-testid="go-back-shopping" to="/">
          <Button
            variant="primary"
            buttonId="purchase-button"
            buttonType="button"
          >
            <Typography
              textId="go-back-shopping-button"
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
