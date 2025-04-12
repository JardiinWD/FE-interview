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

  console.log('Product Received:', product)

  return <SingleProduct product={product} />
}

export default Product
