import { FlexContainer } from '@/components/atoms'
import { SingleProduct } from '@/components/organisms'
import React, { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Product: React.FC = (): JSX.Element => {
  // -------------- CUSTOM HOOK
  const location = useLocation()
  if (!location) return <Navigate to="/" replace />
  // -------------- DATA
  const { product } = location.state
  // TODO : Update this logic with Error boundaries
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
