import React, { JSX } from 'react'
import { Box, Input as ChakraInput } from '@chakra-ui/react'
import { IInputProps } from '@/types/atoms'
import { Typography } from '@/components/atoms'

/**
 * @description Input component
 * @param {string} id - Input ID
 * @param {string} label - Input label
 * @param {string} type - Input type
 * @param {string} placeholder - Input placeholder
 * @param {string} className - Additional class names for styling
 * @param {function} onChange - Change event handler
 */
const Input: React.FC<IInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  boxClassName = '',
  onChange
}): JSX.Element => {
  return (
    <Box className={`${boxClassName} flex flex-col gap-1`}>
      {/* LABEL */}
      <Typography
        tagAs="label"
        htmlFor={id}
        text={label as string}
        weight="regular"
        textColor="text_primary_black_500"
        className="capitalize"
      />
      {/* INPUT */}
      <ChakraInput
        id={id}
        type={type}
        placeholder={placeholder}
        className="border-[1px] border-primary_black_500 rounded-md p-2"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Box>
  )
}

export default Input
