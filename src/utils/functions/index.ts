import { IProduct } from '@/api/types'
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
 * @description Formats a date string or Date object into a readable format.
 * @param {string | Date} date - The date to be formatted.
 * @param {string} locale - The locale to use for formatting (default is 'en-US').
 * @param {object} options - Additional Intl.DateTimeFormat options.
 * @returns {string} - The formatted date string.
 */
export const dateFormatter = (
  date: string | Date,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  // Convert the input to a Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return ''
  // Format the date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }).format(dateObj)
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

/**
 * @description Transforms a JWT expiration timestamp into a readable date and checks if the token is expired.
 * @param {number} token - The expiration timestamp of the JWT (in seconds since epoch).
 * @returns {object} - An object containing the expiration date and a boolean indicating if the token is expired.
 */
export const transformJwtExpirationDate = (token: number) => {
  // Convert the token (seconds since epoch) to milliseconds
  return new Date(token * 1000)
}

/**
 * @description Validates the product quantity to ensure it's within min-max constraints
 * @param product Product to validate quantity for
 * @param requestedQuantity Requested quantity to validate
 * @returns Validated quantity within allowed limits
 */
export const validateQuantity = (
  product: IProduct,
  requestedQuantity: number
): number => {
  // Default to 1 if minimumOrderQuantity is not defined
  const minOrderQuantity = product.minimumOrderQuantity || 1

  // Default to a high number if stock is not defined, otherwise use stock
  const stockAvailable = typeof product.stock === 'number' ? product.stock : 999

  // If the available stock is less than the minimum order quantity,
  // the available stock takes precedence
  const effectiveMin = Math.min(minOrderQuantity, stockAvailable)

  // The requested quantity must not exceed the available stock
  // and must be at least effectiveMin
  const validatedQuantity = Math.min(
    Math.max(requestedQuantity, effectiveMin),
    stockAvailable
  )

  return validatedQuantity
}
