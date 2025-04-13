import React, { JSX } from 'react'
import {
  FlexContainer,
  Button,
  QuantityCounter,
  Typography
} from '@/components/atoms'
import { ICartActionProps } from '@/types/atoms'

/**
 * @description CartAction Component for Product Page
 * @param {IProduct} product - The product object containing product details
 * @param {boolean} isAddToCartVisible - Flag to show/hide the Add to Cart button
 * @param {ICart} cart - The cart object containing cart details
 * @param {function} onAddToCart - Callback function to handle Add to Cart action
 * @param {function} onRetrieveCurrentQuantity - Callback function to retrieve current quantity
 */
const CartAction: React.FC<ICartActionProps> = ({
  product,
  isAddToCartVisible = true,
  cart,
  onAddToCart = () => {},
  onRetrieveCurrentQuantity = (quantity: number) => quantity
}): JSX.Element => {
  // ------------ COUNTER CART ACTION
  const counterValues = product
    ? {
        // Logica per `product`
        initialValue:
          (product?.minimumOrderQuantity ?? 0) > (product?.stock ?? 0)
            ? product.stock
            : product.minimumOrderQuantity,
        minValue:
          (product.minimumOrderQuantity ?? 0) > (product.stock ?? 0)
            ? product.stock
            : product.minimumOrderQuantity,
        maxValue:
          (product.stock ?? 0) > (product.minimumOrderQuantity ?? 0)
            ? product.stock
            : product.minimumOrderQuantity
      }
    : cart
      ? {
          // Logica per `cart`
          initialValue: cart.quantity || 0,
          minValue: cart.quantity || 0,
          maxValue: cart.quantity
        }
      : {
          // Fallback nel caso in cui né `product` né `cart` siano definiti
          initialValue: 0,
          minValue: 0,
          maxValue: 0
        }

  return (
    <FlexContainer
      flexContainerId="add-to-cart"
      align="center"
      justify="space-between"
      gap={2}
    >
      {/* Add To Cart */}
      {isAddToCartVisible && (
        <Button
          variant="primary"
          buttonId="add-to-cart"
          buttonType="button"
          //@ts-expect-error - Something is wrong with the type of `onClick`
          onClick={onAddToCart}
        >
          <Typography
            className="text-primary_black_600"
            tagAs="span"
            weight="bold"
            text="Add to Cart"
          />
        </Button>
      )}

      {/* RECUPERARE DA QUANTITY COUNTER IL VALORE CORRENTE */}

      {/* Quantity Counter */}
      <QuantityCounter
        initialValue={counterValues.initialValue}
        minValue={counterValues.minValue}
        maxValue={counterValues.maxValue}
        step={1}
        onRetrieveCurrentQuantity={onRetrieveCurrentQuantity}
      />
    </FlexContainer>
  )
}

export default CartAction
