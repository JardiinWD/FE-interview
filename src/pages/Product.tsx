import React, { JSX } from 'react'
import { useLocation } from 'react-router-dom'

const Product: React.FC = (): JSX.Element => {
  // -------------- CUSTOM HOOK
  const location = useLocation()
  // -------------- DATA
  const { product } = location.state

  console.log('Product Received:', product)

  return <div>Product Page</div>
}

export default Product
