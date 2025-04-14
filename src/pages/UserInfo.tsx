import { ErrorState, LoadingState } from '@/components/molecules'
import { useLoadingDelay } from '@/hooks'
import { Navigate, useLocation } from 'react-router-dom'

const UserInfo = () => {
  // -------------- CUSTOM HOOK
  const location = useLocation()
  const isLoading = useLoadingDelay(2000)

  // -------------- LOADING STATE
  if (isLoading) return <LoadingState containerId="user-info" />

  // -------------- ERROR HANDLING
  if (!location || !location.state) {
    return (
      <ErrorState
        containerId="user-info"
        errorDevMessage={`Something went Wrong with the User Info, this is the current location.state : ${location.state}`}
        errorMessage={`This user doesn't have any data!`}
        buttonText="Try Again"
      />
    )
  }

  // -------------- DATA
  const { userData } = location.state

  if (!userData) return <Navigate to="/" replace />

  return <div>User Info</div>
}

export default UserInfo
