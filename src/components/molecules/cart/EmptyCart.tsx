import { Button, FlexContainer, Typography } from '@/components/atoms'
import { IEmptyCartProps } from '@/types/molecules'

import React, { JSX } from 'react'
import { Link } from 'react-router-dom'

/**
 * @description EmptyCart component to display when the cart is empty or there was an error loading the cart.
 * @param {string} cartMessage - Message to display when the cart is empty
 * @param {string} cartError - Message to display when there was an error loading the cart
 */
const EmptyCart: React.FC<IEmptyCartProps> = ({
  cartMessage = 'Your cart is empty',
  cartError = 'There was an error loading your cart'
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="cart-page"
      wrap="nowrap"
      direction="column"
      justify="center"
      align="center"
      gap={4}
      className="h-[15rem] w-[30rem] self-center justify-self-center z-10 bg-white shadow-lg rounded-lg p-6"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Typography
        tagAs="h3"
        weight="bold"
        text={cartMessage}
        textColor="text-primary_black_500"
      />
      {process.env.NODE_ENV === 'development' && (
        <Typography
          tagAs="p"
          weight="bold"
          text={`DEV MESSAGE -> ${cartError}`}
          textColor="text-red-500"
        />
      )}

      <Button variant="primary" buttonId="purchase-button" buttonType="button">
        <Link to="/">
          <Typography
            tagAs="p"
            weight="bold"
            text="Start Shopping"
            textColor="text-primary_black_500"
          />
        </Link>
      </Button>
    </FlexContainer>
  )
}

export default EmptyCart
