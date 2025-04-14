import { ICartCheckoutItemProps } from '@/types/atoms'
import React, { JSX } from 'react'
import { FlexContainer, Typography, DiscountPill } from '@/components/atoms'

/**
 * @description CheckoutItem component
 * @param {string} label - The label for the item
 * @param {string} property - The property value for the item
 * @param {number} discountPill - The discount percentage to be displayed
 * @param {string} labelClassName - Custom class name for the label text
 * @param {string} propertyClassName - Custom class name for the property text
 */
const CheckoutItem: React.FC<ICartCheckoutItemProps> = ({
  label,
  property,
  discountPill,
  labelClassName = 'text-primary_black_700',
  propertyClassName = 'text-primary_black_700'
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="cart-checkout-total"
      direction="row"
      justify="space-between"
      align="center"
      wrap="nowrap"
      className="w-full"
    >
      <Typography
        textColor={labelClassName}
        weight="bold"
        tagAs="h5"
        text={label ?? '---'}
      />
      {property && (
        <Typography
          textColor={propertyClassName}
          weight="bold"
          tagAs="h5"
          text={property ?? '---'}
        />
      )}
      {discountPill && <DiscountPill discountPercentage={discountPill} />}
    </FlexContainer>
  )
}

export default CheckoutItem
