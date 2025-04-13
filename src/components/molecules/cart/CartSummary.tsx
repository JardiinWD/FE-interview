import { ICart, IProduct } from '@/api/types'
import {
  CartAction,
  DiscountPill,
  FlexContainer,
  Image,
  Typography
} from '@/components/atoms'
import {
  ICartSummaryProps,
  ICartSummarySingleProductProps
} from '@/types/molecules'
import { transformNumberToCurrency } from '@/utils/functions'
import React, { JSX } from 'react'

/**
 * @description CartSummary Component for Product Page
 * @param {IProduct[]} cartProducts - The product object containing product details
 * @param {number} cartId - The cart ID
 */
const CartSummary: React.FC<ICartSummaryProps> = ({
  cartProducts,
  cartId = '33'
}): JSX.Element => {
  console.log('cartProducts', cartProducts)

  return (
    <FlexContainer
      flexContainerId={`cart-summary-wrapper-${cartId}`}
      direction="column"
      justify="flex-start"
      align="flex-start"
      wrap="nowrap"
      className="h-fit w-[65%] relative z-10 bg-white shadow-lg rounded-lg p-6"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* CartSummarySingleProduct Here */}
      {cartProducts.map(
        (item: ICartSummarySingleProductProps, index: number) => (
          <FlexContainer
            flexContainerId={`single-cart-product-${index}`}
            direction="row"
            key={`single-cart-product-${index}`}
            justify="space-between"
            align="center"
            wrap="nowrap"
            className={`w-full ${index === cartProducts.length - 1 ? '' : 'border-b'} ${index > cartProducts.length - 1 ? '' : 'pb-4'} ${index > cartProducts.length - 1 ? '' : 'pt-2'}`}
          >
            {/* SINGLE CART PRODUCT INFO */}
            <FlexContainer
              flexContainerId={`single-cart-product-info-${index}`}
              direction="row"
              key={index}
              justify="flex-start"
              align="center"
              wrap="nowrap"
              className={`w-[70%]`}
              gap={5}
            >
              {/* PRODUCT IMAGE */}
              <Image
                className="rounded-lg h-24 w-24 bg-primary_white_200"
                src={item.thumbnail}
                alt={item.title}
                fit="fill"
              />
              {/* Product Details and ACTIONS */}
              <FlexContainer
                flexContainerId={`single-cart-product-details-${index}`}
                direction="column"
                key={index}
                justify="flex-start"
                align="flex-start"
                wrap="nowrap"
              >
                {/* Product Title */}
                <Typography
                  textColor="text-primary_black_700"
                  weight="bold"
                  tagAs="h6"
                  text={item.title ?? '---'}
                />
                {/* CART ACTIONS */}
                <CartAction cart={item} isAddToCartVisible={false} />
              </FlexContainer>
            </FlexContainer>
            {/* SINGLE CART PRODUCT PRICE */}
            <FlexContainer
              flexContainerId={`single-cart-product-price-${index}`}
              direction="column"
              key={`single-cart-product-price-${index}`}
              justify="flex-end"
              align="flex-end"
              wrap="nowrap"
              className={`w-[20%] `}
              gap={1}
            >
              {/* NEW PRICE */}
              <FlexContainer
                flexContainerId={`single-cart-product-discounted-${index}`}
                direction="row"
                key={`single-cart-product-discounted-${index}`}
                justify="center"
                align="center"
                wrap="nowrap"
                gap={1}
              >
                <Typography
                  textColor="text-primary_yellow_600"
                  weight="bold"
                  tagAs="h6"
                  text={
                    transformNumberToCurrency(item.discountedTotal) ?? '---'
                  }
                />
                <DiscountPill discountPercentage={item.discountPercentage} />
              </FlexContainer>
              {/* OLD PRICE */}
              <Typography
                textColor="text-primary_black_700 line-through"
                weight="bold"
                tagAs="h6"
                text={transformNumberToCurrency(item.price) ?? '---'}
              />
            </FlexContainer>
          </FlexContainer>
        )
      )}
    </FlexContainer>
  )
}

export default CartSummary
