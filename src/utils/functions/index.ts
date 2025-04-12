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
