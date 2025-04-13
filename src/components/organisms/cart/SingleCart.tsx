import { FlexContainer } from '@/components/atoms'
import { CartSummary } from '@/components/molecules'
import { ISingleCartProps } from '@/types/organisms'
import React, { JSX } from 'react'

/**
 * @description SingleCart component
 * @param { ICartSummarySingleProductProps[]} cartProducts - Array of cart products
 * @param {number} cartId - Cart ID
 * @returns
 */
const SingleCart: React.FC<ISingleCartProps> = ({
  cartProducts,
  cartId
}): JSX.Element => {
  console.log('cartProducts', cartProducts)

  return (
    <FlexContainer
      flexContainerId="cart-content"
      direction="row"
      justify="space-between"
      align="flex-start"
      gap={4}
      wrap="nowrap"
      className="w-full p-4"
    >
      {/* CART SUMMARY */}
      <CartSummary cartId={cartId as number} cartProducts={cartProducts} />

      {/* CART CHECKOUT */}
      <FlexContainer
        flexContainerId="cart-checkout"
        direction="row"
        justify="flex-start"
        align="flex-start"
        wrap="nowrap"
        className="h-fit w-[30%] relative z-10 bg-white shadow-lg rounded-lg p-6"
        style={{
          boxShadow:
            '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
        }}
      >
        'Checkout Section'
      </FlexContainer>
    </FlexContainer>
  )
}

export default SingleCart
