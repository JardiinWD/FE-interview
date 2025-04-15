import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { JSX } from 'react'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const userId = useAuthStore((state) => state.userId)
  const token = useAuthStore((state) => state.allUserData?.accessToken)

  if (!userId || !token) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
