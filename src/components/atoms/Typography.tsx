import React, { JSX } from 'react'
import {
  TTypographyTagName,
  TTypographyWeight,
  ITypographyProps
} from '@/types/atoms'
import fonts from '@/assets/styles/fonts.module.scss'

/**
 * @description Renders a typography component with customizable variant, weight, alignment, and styling.
 * @param {string} weight - The weight of the text. Can be 'regular', 'medium', 'semibold', or 'bold'.
 * @param {string} className - Additional CSS class names for the component.
 * @param {string} htmlString - The HTML string to render. If provided, the component will render as a `TagName` with the HTML string.
 * @param {boolean} uppercase - Whether to render the text in uppercase.
 * @param {string} textAlign - The text alignment. Can be 'left', 'center', or 'right'.
 * @param {Object} style - Additional inline styles for the component.
 * @param {keyof Pick<JSX.IntrinsicElements, 'p' | 'span'>} tagAs - The HTML tag to render the component as.
 * @param {string} text - The text to render. If `htmlString` is provided, this prop is ignored.
 * @param {boolean} whiteSpace - Whether to enable whitespace breaking.
 * @param {string} textColor - The color of the text.
 * @return {JSX.Element} The rendered text component.
 */
const Typography: React.FC<ITypographyProps> = ({
  tagAs = 'p',
  textColor = 'white',
  weight = 'regular',
  text = '',
  textLineHeight = '',
  className = '',
  uppercase = false,
  htmlString = '',
  style = {},
  whiteSpace = false
}): JSX.Element => {
  // ------------- TAG Fonts Size
  const typographyVariant: Record<TTypographyTagName, string> = {
    h1: `${fonts.h1_font_size}`,
    h2: `${fonts.h2_font_size}`,
    h3: `${fonts.h3_font_size}`,
    h4: `${fonts.h4_font_size}`,
    h5: `${fonts.h5_font_size}`,
    h6: `${fonts.h6_font_size}`,
    p: `${fonts.p_font_size}`,
    span: `${fonts.span_font_size}`
  }

  // ------------- TAG Fonts Weight
  const typographyWeight: Record<TTypographyWeight, string> = {
    regular: fonts.font_weight_regular,
    medium: fonts.font_weight_medium,
    bold: fonts.font_weight_bold,
    normal: fonts.font_weight_normal,
    light: fonts.font_weight_light
  }

  // ------------- TAG RENDER
  const TagAs = tagAs

  return htmlString ? (
    <TagAs
      className={`${textColor && `${textColor}`} ${
        textLineHeight && `${textLineHeight}`
      } ${typographyVariant[tagAs]} ${
        typographyWeight && typographyWeight[weight]
      } ${uppercase && 'uppercase'} ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  ) : (
    <TagAs
      className={`${textColor && `${textColor}`} ${
        textLineHeight && `${textLineHeight}`
      } ${typographyVariant[tagAs]} ${
        typographyWeight && typographyWeight[weight]
      }  ${uppercase && 'uppercase'} ${className} ${whiteSpace && 'whitespace-break-spaces'}`}
      style={style}
    >
      {text}
    </TagAs>
  )
}

export default Typography
