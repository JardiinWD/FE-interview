import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * @description Custom hook to check if the expiration date is valid.
 * @param {Date | null} expirationDate - The expiration date of the JWT token.
 */
const useCheckJWTExpiration = (expirationDate: Date | null): void => {
  // -------------- HOOKS
  const navigate = useNavigate()

  useEffect(() => {
    // If no expiration date is provided, redirect to login
    if (!expirationDate) {
      navigate('/login', { replace: true })
      return
    }
    // Convert expirationDate to a Date object if it's a string
    const expiration =
      typeof expirationDate === 'string'
        ? new Date(expirationDate)
        : expirationDate

    // If the token is expired, redirect to login
    if (expiration.getTime() <= Date.now()) {
      console.warn('Token has expired. Redirecting to login...')
      navigate('/login', { replace: true })
    }
  }, [expirationDate, navigate])
}

export default useCheckJWTExpiration
