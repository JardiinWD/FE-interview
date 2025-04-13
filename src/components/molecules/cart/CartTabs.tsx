import { Button, DataLoop, FlexContainer, Typography } from '@/components/atoms'
import { ICartTabsProps } from '@/types/molecules'
import React, { JSX } from 'react'

/**
 * @description CartTabs Component for Cart Page
 * @param {ICart[]} cartData - The cart object containing cart details
 * @param {number} activeTab - The active tab index
 * @param {() => void} onClickHandler - The function to handle tab click
 */
const CartTabs: React.FC<ICartTabsProps> = ({
  cartData,
  activeTab,
  onClickHandler
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="cart-tabs"
      direction="row"
      justify="center"
      align="center"
      gap={2}
      className="w-full  p-2"
    >
      <DataLoop
        eachData={cartData}
        render={(index: number) => (
          <Button
            variant="primary"
            key={index}
            onClick={() => onClickHandler(index)}
            className={`px-4 py-2 ${activeTab !== index && '!bg-gray-200 text-primary_black_500'} rounded-lg`}
          >
            <Typography
              tagAs="span"
              weight="regular"
              textColor="text-primary_black_500"
              text={`Cart ${index + 1}`}
            />
          </Button>
        )}
      />
    </FlexContainer>
  )
}

export default CartTabs
