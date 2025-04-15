import { FlexContainer } from '@/components/atoms'
import { CartCheckout, CartSummary } from '@/components/molecules'
import { ISingleCartProps } from '@/types/organisms'
import React, { JSX } from 'react'

/**
 * @description SingleCart component
 * @param { ICartSummarySingleProductProps[]} cartProducts - Array of cart products
 * @param {number} cartId - Cart ID
 * @param {ICart} cartCheckoutData - Cart checkout data
 * @returns
 */
const SingleCart: React.FC<ISingleCartProps> = ({
  cartProducts,
  cartId,
  cartCheckoutData
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="cart-content"
      direction="row"
      justify="space-between"
      align="flex-start"
      gap={4}
      wrap="nowrap"
      className="w-full p-4 !flex-col lg:!flex-row"
    >
      {/* CART SUMMARY */}
      <CartSummary cartId={cartId as number} cartProducts={cartProducts} />
      {/* CART CHECKOUT */}
      <CartCheckout cartCheckoutData={cartCheckoutData} />
    </FlexContainer>
  )
}

export default SingleCart
