import { DataLoop, FlexContainer } from '@/components/atoms'
import {
  CartSummaryProductInfo,
  CartSummaryProductPrice
} from '@/components/molecules'
import {
  ICartSummaryProps,
  ICartSummarySingleProductProps
} from '@/types/molecules'
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

  console.log('====================================');
  console.log('CART ID FROM CART SUMMARY', cartId);
  console.log('====================================');
  

  return (
    <FlexContainer
      flexContainerId={`cart-summary-wrapper-${cartId}`}
      direction="column"
      justify="flex-start"
      align="flex-start"
      wrap="nowrap"
      className="h-fit w-full lg:w-[65%] relative z-10 bg-white shadow-lg rounded-lg p-6"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      <DataLoop
        eachData={cartProducts.filter(
          (product): product is ICartSummarySingleProductProps =>
            'thumbnail' in product && 'title' in product
        )}
        render={(index: number, item: ICartSummarySingleProductProps) => (
          <FlexContainer
            flexContainerId={`single-cart-product-${index}`}
            direction="row"
            key={`single-cart-product-${index}`}
            justify="space-between"
            align="center"
            wrap="nowrap"
            className={`w-full ${index === cartProducts.length - 1 ? '' : 'border-b'} ${index > cartProducts.length - 1 ? '' : 'pb-4'} ${index > cartProducts.length - 1 ? '' : 'pt-2'}`}
          >
            <CartSummaryProductInfo cartId={cartId as number} item={item} index={index} />
            <CartSummaryProductPrice cartId={cartId as number} item={item} index={index} />
          </FlexContainer>
        )}
      />
    </FlexContainer>
  )
}

export default CartSummary
