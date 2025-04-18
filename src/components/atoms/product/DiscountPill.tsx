import { IDiscountPillProps } from '@/types/atoms'
import { Typography } from '@/components/atoms'
import { JSX } from 'react'

/**
 * @description Product Discount Component
 * @param {number} discountPercentage - The discount percentage to be displayed
 * @param {string} dataTestId - Data test ID for the component
 * @returns {JSX.Element} - The Product Discount component
 */
const DiscountPill: React.FC<IDiscountPillProps> = ({
  discountPercentage = 0,
  dataTestId = 'discount-pill'
}): JSX.Element => {
  return (
    <div
      data-testid={dataTestId}
      className="bg-primary_yellow_400 text-primary_black_700 p-1 rounded-lg"
    >
      <Typography
        textId={`discount-pill-${discountPercentage}`}
        textColor="text-primary_black_700"
        weight="bold"
        tagAs="span"
        text={`${discountPercentage}%`}
        className="tracking-tight"
      />
    </div>
  )
}

export default DiscountPill
