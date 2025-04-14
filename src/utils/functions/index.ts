import { appConfig } from '@/config/appConfig'

/**
 * @description Retrieves the meta tag data based on the current route.
 * @param {string} pathname - The pathname of the current route.
 * @returns the meta tag data for the current route.
 */
export const retrieveHelmetData = (pathname: string) => {
  // Remove leading and trailing slashes from the pathname
  const path =
    pathname === '/'
      ? 'homepage'
      : pathname.split('/').filter((path) => path !== '')[0]
  console.log('path', path)

  // Retrieve the helmet data based on the path
  const helmetData = appConfig.helmets[path] || appConfig.helmets.default

  return helmetData
}

/**
 * @description Truncates long text to a specified maximum length.
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length of the text before truncation.
 * @returns {string} - The truncated text with ellipsis if it exceeds the maximum length.
 */
export const truncateLongText = (text: string, maxLength: number) => {
  // Check if the text is empty or null
  if (!text) return ''
  // Check if the text is already shorter than the maximum length
  if (text.length > maxLength) return text.slice(0, maxLength) + '...'
  // If the text is shorter than the maximum length, return it as is
  return text
}

/**
 * @description Rounds a rating value to the nearest half.
 * @param {number} rating - The rating value to be rounded.
 * @returns {number} - The rounded rating value.
 */
export const handleRouondedRatingValue = (rating: number) => {
  // Check if the rating is a valid number
  if (Number.isInteger(rating)) return rating
  // Else, round the rating to the nearest half
  const roundedRating = Math.round(rating * 2) / 2
  // Check if the rounded rating is greater than 5
  return roundedRating
}

/**
 * @description Transforms a number to a currency string.
 * @param {number} number - The number to be transformed.
 * @returns {string} - The formatted currency string.
 */
export const transformNumberToCurrency = (number: number) => {
  // Check if the number is a valid number
  if (isNaN(number)) return ''
  // Format the number to a currency string
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number)
  // Return the formatted number
  return formattedNumber
}

/**
 * @description Calculates the discounted price percentage based on the old and discounted prices.
 * @param {number} oldPrice - The original price of the product.
 * @param {number} discountedPrice - The discounted price of the product.
 * @returns {number} - The discount percentage.
 */
export const calculateDiscountedPrice = (
  oldPrice: number,
  discountedPrice: number
) => {
  // Check if the old price is greater than the discounted price
  if (oldPrice > discountedPrice) {
    // Calculate the discount percentage
    const discountPercentage =
      Math.round(((oldPrice - discountedPrice) / oldPrice) * 100 * 100) / 100
    // Return the discount percentage
    return discountPercentage
  }
  // If the old price is not greater than the discounted price, return 0
  return 0
}
