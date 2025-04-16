import React, { JSX } from 'react'
import {
  CartAction,
  FlexContainer,
  Image,
  Typography
} from '@/components/atoms'
import { ICartSummaryProductInfoProps } from '@/types/molecules'
import { useCartStore } from '@/store'
import { useCartActions } from '@/hooks'

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
  // ------------ CUSTOM HOOK
  const { retrieveCurrentQuantity } = useCartActions(item)

  console.log('====================================')
  console.log('item', item)
  console.log('index', index)
  console.log('cartId', cartId)
  console.log('====================================')

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
          textId={`cart-summary-title-${item.title}`}
          textColor="text-primary_black_700"
          weight="bold"
          tagAs="h6"
          text={item.title ?? '---'}
        />
        {/* CART ACTIONS */}
        <CartAction
          containerClassName="lg:w-[70%] !flex-row !flex-nowrap"
          isRemoveFromCartVisible={true}
          onRemoveFromCart={() =>
            removeProductFromCart(cartId as number, item.id as number)
          }
          cart={item}
          isAddToCartVisible={false}
          onRetrieveCurrentQuantity={retrieveCurrentQuantity}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default CartSummaryProductInfo
