import { Typography } from '@/components/atoms'
import { IFormInputProps } from '@/types/atoms'
import { Box, Input } from '@chakra-ui/react'
import React, { JSX } from 'react'

/**
 * @description FormInput component
 * @param {string} id - Input ID
 * @param {string} label - Input label
 * @param {TFormInputType} type - Input type
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message
 * @param {object} register - React Hook Form register function
 * @param {string} className - Additional class names for styling
 */
const FormInput: React.FC<IFormInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  error,
  register,
  className = ''
}): JSX.Element => {
  return (
    <Box className={`w-full ${className}`}>
      {/* LABEL */}
      <Typography
        tagAs="label"
        textId={`label-${id}`}
        htmlFor={id}
        text={label}
        weight="regular"
        textColor="text_primary_black_500"
        className="capitalize"
      />
      {/* INPUT */}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="border-[1px] border-primary_black_500 rounded-md p-2"
        {...register}
      />
      {/* ERROR MESSAGE */}
      {error && (
        <Typography
          textId={`error-${id}`}
          tagAs="label"
          text={error}
          textColor="text-red-500"
          className="mt-1 !text-[8px]"
          weight="regular"
        />
      )}
    </Box>
  )
}

export default FormInput
