import React, { JSX } from 'react'
import { FlexContainer, Button, QuantityCounter } from '@/components/atoms'
import { ICartActionProps } from '@/types/atoms'

/**
 * @description CartAction Component for Product Page
 * @param {IProduct} product - The product object containing product details
 */
const CartAction: React.FC<ICartActionProps> = ({ product }): JSX.Element => {
  // ------------ COUNTER CART ACTION
  const counterValues = {
    // Initial Value Logic -> If minimum order quantity is greater than stock, set initial value to stock
    initialValue:
      product.minimumOrderQuantity > product.stock
        ? product.stock
        : product.minimumOrderQuantity,
    // Min Value Logic -> If minimum order quantity is greater than stock, set min value to stock
    minValue:
      product.minimumOrderQuantity > product.stock
        ? product.stock
        : product.minimumOrderQuantity,
    // Max Value Logic -> If minimum order quantity is greater than stock, set max value to stock
    maxValue:
      product.stock > product.minimumOrderQuantity
        ? product.stock
        : product.minimumOrderQuantity
  }

  return (
    <FlexContainer
      flexContainerId="add-to-cart"
      align="center"
      justify="space-between"
      gap={2}
    >
      {/* Add To Cart */}
      <Button
        variant="primary"
        buttonId="add-to-cart"
        buttonType="button"
        onClick={() => {}}
      >
        Add to Cart
      </Button>
      {/* Quantity Counter */}
      <QuantityCounter
        initialValue={counterValues.initialValue}
        minValue={counterValues.minValue}
        maxValue={counterValues.maxValue}
        step={1}
      />
    </FlexContainer>
  )
}

export default CartAction
