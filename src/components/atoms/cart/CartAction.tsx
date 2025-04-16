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
 * @param {boolean} isRemoveFromCartVisible - Flag to show/hide the Remove from Cart button
 * @param {ICart} cart - The cart object containing cart details
 * @param {function} onAddToCart - Callback function to handle Add to Cart action
 * @param {function} onRemoveFromCart - Callback function to handle Remove from Cart action
 * @param {function} onRetrieveCurrentQuantity - Callback function to retrieve current quantity
 * @param {string} containerClassName - Additional class name for the container
 * @param {string} buttonClassName - Additional class name for the button
 * @param {string} counterClassName - Additional class name for the counter
 * @param {boolean} isLoading - Flag to show loading state
 */
const CartAction: React.FC<ICartActionProps> = ({
  product,
  isAddToCartVisible = true,
  isRemoveFromCartVisible = false,
  cart,
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
  onRetrieveCurrentQuantity = (quantity: number) => quantity,
  isLoading = false,
  containerClassName = 'lg:w-[40%]',
  buttonClassName = 'lg:w-[10rem] lg:max-w-[10rem]',
  counterClassName = ''
}): JSX.Element => {

  console.log('====================================');
  console.log('product', product);
  console.log('Cart', cart);
  
  console.log('====================================');


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
      
      className={`w-full ${containerClassName}`}
      gap={2}
    >
      {/* Add To Cart */}
      {isAddToCartVisible && (
        <Button
          variant="primary"
          buttonId="add-to-cart"
          buttonType="button"
          isLoading={isLoading}
          className={`${buttonClassName} w-full`}
          //@ts-expect-error - Something is wrong with the type of `onClick`
          onClick={onAddToCart}
        >
          <Typography
            textId="add-to-cart"
            className="text-primary_black_600"
            tagAs="span"
            weight="bold"
            text="Add to Cart"
          />
        </Button>
      )}
      {/* Remove From Cart */}
      {isRemoveFromCartVisible && (
        <Button
          variant="tertiary"
          buttonId="remove-from-cart"
          buttonType="button"
          isLoading={isLoading}
          className={`${buttonClassName} w-full !p-2.5`}
          //@ts-expect-error - Something is wrong with the type of `onClick`
          onClick={onRemoveFromCart}
        >
          <Typography
            textId="remove-from-cart"
            className="text-primary_black_600"
            tagAs="span"
            weight="bold"
            text="Remove"
          />
        </Button>
      )}

      {/* Quantity Counter */}
      <QuantityCounter
        initialValue={counterValues.initialValue}
        minValue={counterValues.minValue}
        maxValue={counterValues.maxValue}
        step={1}
        onRetrieveCurrentQuantity={onRetrieveCurrentQuantity}
        counterClassName={counterClassName}
      />
    </FlexContainer>
  )
}

export default CartAction
