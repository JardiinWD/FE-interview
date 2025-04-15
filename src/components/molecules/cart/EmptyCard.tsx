import { Button, FlexContainer, Typography } from '@/components/atoms'
import { IEmptyCardProps } from '@/types/molecules'

import React, { JSX } from 'react'
import { Link } from 'react-router-dom'

/**
 * @description EmptyCard component to display when the cart is empty or there was an error loading the cart.
 * @param {string} cardMessage - Message to display when the cart is empty
 * @param {string} cardError - Message to display when there was an error loading the cart
 */
const EmptyCard: React.FC<IEmptyCardProps> = ({
  cardMessage = 'Your cart is empty',
  cardError = 'There was an error loading your cart',
  buttonText = 'Start Shopping',
  onClickHandler = () => {}
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="cart-page"
      wrap="nowrap"
      direction="column"
      justify="center"
      align="center"
      gap={4}
      className="h-[15rem] w-full md:w-[30rem] lg:w-[30rem] self-center justify-self-center z-10 bg-white shadow-lg rounded-lg p-6"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Typography
        tagAs="h3"
        weight="bold"
        text={cardMessage}
        textColor="text-primary_black_500 text-center"
      />
      {process.env.NODE_ENV === 'development' && (
        <Typography
          tagAs="p"
          className="text-center"
          weight="bold"
          text={`DEV MESSAGE -> ${cardError}`}
          textColor="text-red-500"
        />
      )}
      {/* BUTTON */}
      <Button
        onClick={onClickHandler}
        variant="primary"
        buttonId="purchase-button"
        buttonType="button"
      >
        <Link to="/">
          <Typography
            tagAs="p"
            weight="bold"
            text={buttonText}
            textColor="text-primary_black_500"
          />
        </Link>
      </Button>
    </FlexContainer>
  )
}

export default EmptyCard
