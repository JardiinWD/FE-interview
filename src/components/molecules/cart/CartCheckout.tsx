import {
  Button,
  CheckoutItem,
  FlexContainer,
  Typography
} from '@/components/atoms'
import { ICartCheckoutProps } from '@/types/molecules'
import {
  calculateDiscountedPrice,
  transformNumberToCurrency
} from '@/utils/functions'
import React, { JSX } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * @description CartCheckout component for displaying the checkout summary
 * @param {ICartCheckoutProps} cartCheckoutData - Cart checkout data
 */
const CartCheckout: React.FC<ICartCheckoutProps> = ({
  cartCheckoutData
}): JSX.Element => {
  // ---------------- CUSTOM HOOKS
  const navigate = useNavigate()

  // ---------------- HANDLERS
  const handleCheckoutRedirect = () => {
    // Redirect to checkout page
    navigate('/checkout')
  }

  return (
    <FlexContainer
      flexContainerId="cart-checkout"
      dataTestId="cart-checkout"
      direction="column"
      justify="flex-start"
      align="flex-start"
      wrap="nowrap"
      className="h-fit w-full lg:w-[30%] relative z-10 bg-white shadow-lg rounded-lg p-6"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* TOTAL AMOUNT */}
      <CheckoutItem
        dataTestId="total-amount"
        label={'Total'}
        property={transformNumberToCurrency(cartCheckoutData.total) as string}
      />
      {/* DISCOUNT PERCENTAGE */}
      <CheckoutItem
        dataTestId="discount-percentage"
        label={'Discount'}
        discountPill={calculateDiscountedPrice(
          cartCheckoutData.total,
          cartCheckoutData.discountedTotal ?? cartCheckoutData.discountedPrice
        )}
      />
      <hr
        className="w-full"
        style={{
          backgroundColor: 'var(--color-primary_white_200)',
          height: '1px',
          margin: '0.5rem 0'
        }}
      />
      <CheckoutItem
        dataTestId="discounted-price"
        label={'Discounted Price'}
        propertyClassName="text-primary_yellow_600"
        property={
          transformNumberToCurrency(
            cartCheckoutData.discountedTotal ?? cartCheckoutData
          ) as string
        }
      />
      <Button
        variant="primary"
        buttonId="checkout"
        dataTestId="checkout-button"
        buttonType="button"
        onClick={handleCheckoutRedirect}
        className="mt-4 w-full"
      >
        <Typography
          textId="cart-checkout-button"
          className="text-primary_black_600"
          tagAs="span"
          weight="bold"
          text="Checkout"
        />
      </Button>
    </FlexContainer>
  )
}

export default CartCheckout
