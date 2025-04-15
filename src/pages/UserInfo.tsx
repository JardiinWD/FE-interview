import { FlexContainer } from '@/components/atoms'
import { ErrorState, LoadingState } from '@/components/molecules'
import { SingleUserInfo } from '@/components/organisms'
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

  return (
    <FlexContainer
      className="p-4 xs:h-[90dvh] sm:h-[95dvh] md:h-[90dvh] lg:h-auto xl:h-auto pt-4 w-full "
      gap={5}
      flexContainerId="user-info-page"
      direction="column"
      justify="center"
      align="center"
    >
      <SingleUserInfo userData={userData} />
    </FlexContainer>
  )
}

export default UserInfo
