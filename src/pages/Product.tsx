import { FlexContainer } from '@/components/atoms'
import { ErrorState, LoadingState } from '@/components/molecules'
import { ReviewsCarousel, SingleProduct } from '@/components/organisms'
import { useLoadingDelay } from '@/hooks'
import React, { JSX } from 'react'
import { useLocation } from 'react-router-dom'

const Product: React.FC = (): JSX.Element => {
  // -------------- CUSTOM HOOK
  const location = useLocation()
  const isLoading = useLoadingDelay(2000)

  // -------------- LOADING STATE
  if (isLoading) return <LoadingState containerId="product" />

  // -------------- ERROR HANDLING
  if (!location || !location.state) {
    return (
      <ErrorState
        containerId="product-location-state"
        errorDevMessage={`Something went Wrong with the product, this is the current location.state : ${location.state}`}
        errorMessage="This product is not available!"
        buttonText="Start Shopping"
      />
    )
  }
  // -------------- DATA
  const { product } = location.state

  if (!product)
    return (
      <ErrorState
        containerId="product-not-available"
        errorDevMessage={`Something went Wrong with this product!`}
        errorMessage="This product is not available!"
        buttonText="Try Again"
      />
    )

  return (
    <FlexContainer
      className="p-4 pt-[4rem] max-w-full w-full"
      gap={5}
      flexContainerId="product-page"
      direction="column"
      justify="center"
      align="center"
    >
      <SingleProduct product={product} />
      {product.reviews && <ReviewsCarousel reviews={product.reviews} />}
    </FlexContainer>
  )
}

export default Product
