import { useAuthStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * @description Custom hook to check if the expiration date is valid.
 * @param {Date | null} expirationDate - The expiration date of the JWT token.
 */
const useCheckJWTExpiration = (expirationDate: Date | null): void => {
  // -------------- HOOKS
  const navigate = useNavigate()
  // -------------- ZUSTAND STORE
  const { clearUserId } = useAuthStore()

  useEffect(() => {
    // If no expiration date is provided, clear auth state and redirect to login
    if (!expirationDate) {
      clearUserId() // Clear auth data
      navigate('/login', { replace: true })
      return
    }

    // Convert expirationDate to a Date object if it's a string
    const expiration =
      typeof expirationDate === 'string'
        ? new Date(expirationDate)
        : expirationDate

    // If the token is expired, clear auth data and redirect to login
    if (expiration.getTime() <= Date.now()) {
      console.warn('Token has expired. Redirecting to login...')
      clearUserId() // Clear auth data
      navigate('/login', { replace: true })
    }

    // Set up a check that will run when the token expires
    const timeUntilExpiry = expiration.getTime() - Date.now()

    // Only set timeout if expiry is in the future
    if (timeUntilExpiry > 0) {
      const logoutTimer = setTimeout(() => {
        console.warn('Token has expired. Logging out...')
        clearUserId()
        navigate('/login', { replace: true })
      }, timeUntilExpiry)

      // Clean up the timer on unmount
      return () => clearTimeout(logoutTimer)
    }
  }, [expirationDate, navigate, clearUserId])
}

export default useCheckJWTExpiration
