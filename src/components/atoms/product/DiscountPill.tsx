import { IDiscountPillProps } from '@/types/atoms'
import { Typography } from '@/components/atoms'
import { JSX } from 'react'

/**
 * @description Product Discount Component
 * @param {number} discountPercentage - The discount percentage to be displayed
 * @returns {JSX.Element} - The Product Discount component
 */
const DiscountPill: React.FC<IDiscountPillProps> = ({
  discountPercentage = 0
}): JSX.Element => {
  return (
    <div className="bg-primary_yellow_400 text-primary_black_700 p-1 rounded-lg">
      <Typography
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
