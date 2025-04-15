import React, { JSX } from 'react'
import { DiscountPill, FlexContainer, Typography } from '@/components/atoms'
import { ICartSummaryProductPriceProps } from '@/types/molecules'
import { transformNumberToCurrency } from '@/utils/functions'

/**
 * @description CartSummaryProductPrice Component for Product Page
 * @param {ICartSummaryProductPriceProps} item - The product object containing product details
 * @param {number} index - The index of the product in the cart
 * @returns
 */
const CartSummaryProductPrice: React.FC<ICartSummaryProductPriceProps> = ({
  item,
  index,
  cartId = '33'
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId={`cart-summary-product-price-${index}`}
      direction="column"
      key={`cart-summary-product-price-${index}`}
      justify="flex-end"
      align="flex-end"
      wrap="nowrap"
      className={`w-full lg:w-[20%] lg:!flex-nowrap !flex-wrap`}
      gap={1}
    >
      {/* OLD PRICE */}
      <Typography
        textColor="text-primary_black_700 line-through"
        weight="bold"
        tagAs="h6"
        text={transformNumberToCurrency(item.total) ?? '---'}
      />
      {/* NEW PRICE */}
      <FlexContainer
        flexContainerId={`cart-summary-product-price-discounted-${index}`}
        direction="row"
        key={`cart-summary-product-price-discounted-${index}`}
        justify="center"
        align="center"
        wrap="nowrap"
        gap={1}
      >
        <Typography
          textColor="text-primary_yellow_600"
          weight="bold"
          tagAs="h5"
          text={
            transformNumberToCurrency(
              item.discountedTotal ?? item.discountedPrice
            ) ?? '---'
          }
        />
        {/* Discount Pill */}
        <DiscountPill discountPercentage={item.discountPercentage} />
      </FlexContainer>
    </FlexContainer>
  )
}

export default CartSummaryProductPrice
