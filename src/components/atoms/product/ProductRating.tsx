import { IProductRatingProps } from '@/types/atoms'
import React, { JSX } from 'react'

/**
 * @description ProductRating component
 * @param {number} rating - The rating of the product (0 to 5).
 */
const ProductRating: React.FC<IProductRatingProps> = ({
  rating = 0,
  starsProps = {
    width: 'w-4',
    height: 'h-4'
  }
}): JSX.Element => {
  // Round the rating to the nearest half
  const roundedRating = Math.round(rating * 2) / 2

  // Generate stars based on the rounded rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1

    if (roundedRating >= starValue) {
      // Full star
      return (
        <svg
          key={index}
          className={`${starsProps.width} ${starsProps.height} text-primary_yellow_500`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      )
    } else if (roundedRating >= starValue - 0.5) {
      // Mid Empty star
      return (
        <svg
          key={index}
          className={`${starsProps.width} ${starsProps.height} text-primary_yellow_500`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <defs>
            <linearGradient id={`half-star-${index}`}>
              <stop offset="50%" stopColor="#ffd966" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-star-${index})`}
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
      )
    } else {
      // Empty Star
      return (
        <svg
          key={index}
          className={`${starsProps.width} ${starsProps.height}  text-gray-200 dark:text-gray-600`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      )
    }
  })

  return <div className="flex items-center">{stars}</div>
}

export default ProductRating
