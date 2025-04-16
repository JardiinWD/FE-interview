import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { JSX } from 'react'
import { useCheckJWTExpiration } from '@/hooks'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // -------------- ZUSTAND STORE
  const userId = useAuthStore((state) => state.userId)
  const token = useAuthStore((state) => state.allUserData?.accessToken)
  const expirationDate = useAuthStore((state) => state.expirationDate)

  // -------------- CHECK EXPIRATION
  useCheckJWTExpiration(expirationDate)

  // -------------- REDIRECT TO LOGIN
  if (!userId || !token) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
