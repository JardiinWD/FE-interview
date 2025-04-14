import React, { JSX } from 'react'
import { ITypographyProps } from '@/types/atoms'
import fonts from '@/assets/styles/fonts.module.scss'

/**
 * @description Renders a typography component with customizable variant, weight, alignment, and styling.
 * @param {string} weight - The weight of the text. Can be 'regular', 'medium', 'semibold', or 'bold'.
 * @param {string} className - Additional CSS class names for the component.
 * @param {string} htmlString - The HTML string to render. If provided, the component will render as a `TagName` with the HTML string.
 * @param {boolean} uppercase - Whether to render the text in uppercase.
 * @param {Object} style - Additional inline styles for the component.
 * @param {keyof Pick<JSX.IntrinsicElements, 'p' | 'span'>} tagAs - The HTML tag to render the component as.
 * @param {string} text - The text to render. If `htmlString` is provided, this prop is ignored.
 * @param {boolean} whiteSpace - Whether to enable whitespace breaking.
 * @param {string} textColor - The color of the text.
 * @param {string} textLineHeight - The line height of the text.
 * @param {string} htmlFor - The HTML for attribute for the label tag.
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
  whiteSpace = false,
  htmlFor
}): JSX.Element => {
  // ------------- TAG Fonts Size
  const typographyVariant: Record<ITypographyProps['tagAs'], string> = {
    h1: `${fonts.h1_font_size}`,
    h2: `${fonts.h2_font_size}`,
    h3: `${fonts.h3_font_size}`,
    h4: `${fonts.h4_font_size}`,
    h5: `${fonts.h5_font_size}`,
    h6: `${fonts.h6_font_size}`,
    p: `${fonts.p_font_size}`,
    span: `${fonts.span_font_size}`,
    label: `${fonts.label_font_size}`
  }

  // ------------- TAG Fonts Weight
  const typographyWeight: Record<ITypographyProps['weight'], string> = {
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
      htmlFor={htmlFor}
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
      htmlFor={htmlFor}
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
