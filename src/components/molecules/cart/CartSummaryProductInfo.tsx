import React, { JSX } from 'react'
import {
  CartAction,
  FlexContainer,
  Image,
  Typography
} from '@/components/atoms'
import { ICartSummaryProductInfoProps } from '@/types/molecules'
import { useCartStore } from '@/store'

/**
 * @description CartSummaryProductInfo Component for Product Page
 * @param {ICartSummaryProductInfoProps} item - The product object containing product details
 * @param {number} index - The index of the product in the cart
 */
const CartSummaryProductInfo: React.FC<ICartSummaryProductInfoProps> = ({
  item,
  index,
  cartId = '33'
}): JSX.Element => {
  // -------------- ZUSTAND STORE
  const { removeProductFromCart } = useCartStore()

  return (
    <FlexContainer
      flexContainerId={`cart-summary-product-info-${index}`}
      direction="row"
      key={index}
      justify="flex-start"
      align="center"
      wrap="nowrap"
      className={`lg:w-[70%] w-full`}
      gap={5}
    >
      {/* PRODUCT IMAGE */}
      <Image
        className="rounded-lg hidden lg:flex lg:h-24 lg:w-24 bg-primary_white_200"
        src={item.thumbnail}
        alt={item.title}
        fit="fill"
      />
      {/* Product Details and ACTIONS */}
      <FlexContainer
        flexContainerId={`cart-summary-product-details-${index}`}
        direction="column"
        key={index}
        justify="flex-start"
        align="flex-start"
        wrap="nowrap"
        className="lg:w-[70%] w-full"
      >
        {/* Product Title */}
        <Typography
          textColor="text-primary_black_700"
          weight="bold"
          tagAs="h6"
          text={item.title ?? '---'}
        />
        {/* CART ACTIONS */}
        <CartAction
          isRemoveFromCartVisible={true}
          onRemoveFromCart={() =>
            removeProductFromCart(cartId as number, item.id as number)
          }
          cart={item}
          isAddToCartVisible={false}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default CartSummaryProductInfo
