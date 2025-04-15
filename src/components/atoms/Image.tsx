import React, { JSX } from 'react'
import { Image as ChakraImage } from '@chakra-ui/react'
import { IImageProps } from '@/types/atoms'


/**
 * @description Image component that displays an image with optional properties.
 * @param {string} src - The source URL of the image.
 * @param {string} alt - The alt text for the image.
 * @param {string} className - Additional CSS classes for styling.
 * @param {React.CSSProperties} style - Additional inline styles for the image.
 * @param {number} htmlHeight - The height of the image in pixels.
 * @param {number} htmlWidth - The width of the image in pixels.
 * @param {string} fit - The fit property for the image (e.g., 'cover', 'contain').
 */
const Image: React.FC<IImageProps> = ({
  src = 'https://via.placeholder.com/150',
  alt = 'Placeholder Image',
  className = '',
  style = {},
  htmlHeight = 150,
  htmlWidth = 150,
  fit = 'cover'
}): JSX.Element => {
  return (
    <ChakraImage
      src={src}
      alt={alt}
      className={className}
      style={style}
      htmlHeight={htmlHeight}
      htmlWidth={htmlWidth}
      fit={fit}
    />
  )
}

export default Image
