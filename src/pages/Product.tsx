import { FlexContainer, Spinner } from '@/components/atoms'
import { EmptyCard } from '@/components/molecules'
import { SingleProduct } from '@/components/organisms'
import React, { JSX, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// -------------- INTERFACES
interface IState {
  isLoading: boolean
}

const Product: React.FC = (): JSX.Element => {
  // -------------- CUSTOM HOOK
  const location = useLocation()

  // -------------- STATE
  const [state, setState] = useState<IState>({
    isLoading: true
  })

  // -------------- EFFECT
  useEffect(() => {
    // Simulate a Timeout for loading state
    const timer = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false
      }))
    }, 2000) // 2 seconds delay

    // Cleanup the timer
    return () => clearTimeout(timer)
  }, [])

  // -------------- LOADING STATE
  if (state.isLoading) {
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
        <Spinner />
      </FlexContainer>
    )
  }

  // -------------- ERROR HANDLING
  if (!location || !location.state) {
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
        <EmptyCard
          cardError={`Something went Wrong with the product, this is the current location.state : ${location.state}`}
          cardMessage={`This product is not available!`}
        />
      </FlexContainer>
    )
  }
  // -------------- DATA
  const { product } = location.state

  if (!product) return <Navigate to="/" replace />

  return (
    <FlexContainer
      className="p-4 pt-[4rem]"
      gap={5}
      flexContainerId="product-page"
      direction="column"
      justify="center"
      align="center"
    >
      <SingleProduct product={product} />
      {/* TODO: Pensare di mettere le reviews qua sotto nel caso ci fossero (SingleProductReviews) */}
    </FlexContainer>
  )
}

export default Product
