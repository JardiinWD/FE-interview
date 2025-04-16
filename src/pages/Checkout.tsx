import React, { JSX } from 'react'
import { useLoadingDelay } from '@/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import { ErrorState, LoadingState } from '@/components/molecules'
import { FlexContainer } from '@/components/atoms'
import { Box } from '@chakra-ui/react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const Checkout: React.FC = (): JSX.Element => {
  // -------------- CUSTOM HOOK
  const isLoading = useLoadingDelay(2000)
  const { width, height } = useWindowSize()

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
      {/* <Confetti width={width} height={height} /> */}
      <Box
        width={['100%', '100%', '70%', '70%']}
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
        Content
      </Box>
      <Box
        width={['100%', '100%', '50%', '50%']}
        height={['10%', '10%', '10%', '10%']}
        padding={4}
        borderRadius="md"
        boxShadow="md"
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        id="checkout-buttons"
      >
        Buttons
      </Box>
    </FlexContainer>
  )
}

export default Checkout
