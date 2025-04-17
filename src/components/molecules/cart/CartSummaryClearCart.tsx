import { Button, FlexContainer, Typography } from '@/components/atoms'
import { useCartStore } from '@/store'
import React, { JSX } from 'react'
import { toast } from 'react-toastify'

const CartSummaryClearCart: React.FC = (): JSX.Element => {
  // ---------------- INTERFACES
  const { clearCart } = useCartStore()

  // ---------------- HANDLERS
  const handleClearCart = () => {
    // Clear zustand cart store and reset it
    clearCart()
    // Show a toast of success message
    toast.success('Cart cleared successfully!')
  }

  return (
    <FlexContainer
      flexContainerId={`cart-clearer-container`}
      direction="row"
      justify="flex-end"
      align="center"
      wrap="wrap"
      className="w-full pt-4"
    >
      <Button
        variant="primary"
        buttonId="checkout"
        buttonType="button"
        onClick={handleClearCart}
        className="mt-4 w-full lg:w-[20%]"
      >
        <Typography
          textId="cart-checkout-button"
          className="text-primary_black_600"
          tagAs="span"
          weight="bold"
          text="Clear Cart"
        />
      </Button>
    </FlexContainer>
  )
}

export default CartSummaryClearCart
