import React, { JSX } from 'react'
import { Image as ChakraImage } from '@chakra-ui/react'
import { IImageProps } from '@/types/atoms'

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
