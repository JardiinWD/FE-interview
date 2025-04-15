import { IButtonProps } from '@/types/atoms'
import React, { JSX } from 'react'
import { Spinner } from '@/components/atoms'

/**
 * @description A reusable Button component that supports various styles and behaviors.
 * @param children - The content to be displayed inside the button.
 * @param variant - The visual style of the button. Defaults to 'primary'.
 * @param onClick - The callback function to handle click events.
 * @param className - Additional CSS class names to apply to the button. Defaults to an empty string.
 * @param style - Inline styles to apply to the button. Defaults to an empty object.
 * @param buttonType - The type attribute of the button element (e.g., 'button', 'submit', 'reset'). Defaults to 'button'.
 * @param formId - The ID of the form associated with the button. Defaults to 'generic-form-id'.
 */
const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'primary',
  onClick = () => {},
  className = '',
  style = {},
  buttonType = 'button',
  formId = `generic-form-id`,
  buttonId = `generic-button-id`,
  disabled = false,
  isLoading = false
}): JSX.Element => {
  // ------------- VARIANTS
  const buttonVariants: Record<IButtonProps['variant'], string> = {
    primary: `bg-primary_yellow_600 text-primary_black_600 px-[1rem] py-[0.5rem] transition-colors duration-300 rounded-lg hover:bg-primary_yellow_500`,
    secondary: `bg-primary_yellow_400 text-primary_black_500 px-[1rem] py-[0.5rem] transition-colors duration-300 rounded-lg hover:text-primary_white_100 hover:bg-primary_yellow_200`,
    tertiary: `bg-primary_white_200 text-primary_black_500 px-[1rem] py-[0.5rem] transition-colors duration-300 rounded-lg hover:bg-primary_yellow_500`
  }

  return (
    <button
      formTarget={formId}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${buttonVariants[variant]}`}
      style={style}
      type={buttonType}
      id={buttonId}
    >
      {isLoading ? (
        <Spinner
          customColor="fill-primary_black_600"
          width="1.5rem"
          height="1.5rem"
        />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
