import React, { JSX } from 'react'
import { Flex } from '@chakra-ui/react'
import { IFlexContainerProps } from '@/types/atoms'

/**
 * @description A flexible container component that uses Chakra UI's Flex component.
 * It allows for customizable layout properties such as direction, justification,
 * alignment, wrapping, and gap between child elements.
 * @param {React.ReactNode} children - The content to be displayed within the Flex container.
 * @param {TFlexContainerDirections} direction - The direction in which the child elements are laid out.
 * @param {TFlexContainerJustify} justify - The justification of the child elements along the main axis.
 * @param {TFlexContainerAlign} align - The alignment of the child elements along the cross axis.
 * @param {TFlexContainerWrap} wrap - The wrapping behavior of the child elements.
 * @param {number} gap - The gap between child elements, specified in pixels.
 * @returns {JSX.Element} The rendered Flex container component.
 */
const FlexContainer: React.FC<IFlexContainerProps> = ({
  children,
  direction = 'row',
  justify = 'center',
  align = 'center',
  wrap = 'wrap',
  gap = 2,
  className = '',
  style = {},
  flexContainerId = `flex`
}): JSX.Element => {
  return (
    <Flex
      id={`${flexContainerId}-container`}
      className={className}
      style={style}
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
      gap={`${gap}`}
    >
      {children}
    </Flex>
  )
}

export default FlexContainer
