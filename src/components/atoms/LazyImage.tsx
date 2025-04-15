import { ILazyImageProps } from '@/types/atoms';
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';


/**
 * @description LazyImage component that loads images lazily to improve performance.
 * @param {string} alt - The alt text for the image.
 * @param {string} src - The source URL of the image.
 * @param {number} height - The height of the image.
 * @param {number} width - The width of the image.
 * @param {React.ReactElement} placeholder - The placeholder image to show while the main image is loading.
 */
const LazyImage: React.FC<ILazyImageProps> = ({
    alt,
    src,
    placeholder,
    height = 100,
    width = 100,
    className = ''
}) => {
  return <LazyLoadImage className={className} alt={alt} src={src} placeholder={placeholder} height={height} width={width} />
  
}

export default LazyImage
