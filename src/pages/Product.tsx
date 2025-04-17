import { ProductApi } from '@/api'
import { FlexContainer } from '@/components/atoms'
import {
  ErrorState,
  LoadingState,
  RecommendedProducts
} from '@/components/molecules'
import { ReviewsCarousel, SingleProduct } from '@/components/organisms'
import { useQuery } from '@tanstack/react-query'
import React, { JSX } from 'react'
import { useLocation } from 'react-router-dom'

const Product: React.FC = (): JSX.Element => {
  // -------------- CUSTOM HOOK
  const location = useLocation()

  // -------------- ERROR HANDLING
  if (!location || !location.state) {
    return (
      <ErrorState
        dataTestId="product-error-landing"
        containerId="product-location-state"
        errorDevMessage={`Something went Wrong with the product, this is the current location.state : ${location.state}`}
        errorMessage="This product is not available!"
        buttonText="Start Shopping"
      />
    )
  }

  // -------------- DATA
  const { productId } = location.state

  // -------------- API CALL
  const { isPending, data: apiData } = useQuery({
    queryKey: [productId],
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error } = await ProductApi.getProductById(productId)
      // Return the necessary data
      return {
        data: data,
        error: error,
        status: status
      }
    }
  })

  // -------------- LOADING STATE
  if (isPending) return <LoadingState containerId="product" />

  // -------------- ERROR HANDLING
  if (!apiData?.data)
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
      direction="row"
      justify="center"
      align="center"
      wrap="wrap"
    >
      <SingleProduct product={apiData?.data} />
      {apiData?.data?.reviews && (
        <ReviewsCarousel
          dataTestId={`reviews-carousel-${apiData?.data?.id}`}
          reviews={apiData?.data?.reviews}
        />
      )}
      {apiData?.data?.category && (
        <RecommendedProducts category={apiData?.data?.category} />
      )}
    </FlexContainer>
  )
}

export default Product
