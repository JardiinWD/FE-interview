import { Button, FlexContainer, Image, Typography } from '@/components/atoms'
import { UserAdditionalInfo } from '@/components/molecules'
import { useAuthStore } from '@/store'
import { ISingleUserInfo } from '@/types/organisms'
import { Box } from '@chakra-ui/react'
import { JSX } from 'react'

/**
 * @description SingleUserInfo component to display single user information
 * @param {IAuthData} userData - user data to display
 */
const SingleUserInfo: React.FC<ISingleUserInfo> = ({
  userData
}): JSX.Element => {
  return (
    <Box
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
      className="bg-primary_white_100 p-4 shadow-lg z-10 flex flex-nowrap items-start justify-between"
      rounded="lg"
      height={'fit-content'}
      width={['100%', '80%', '80%']}
      id="user-info-box"
    >
      {/* LEFT SIDE */}
      <FlexContainer
        className="w-[25%]"
        gap={5}
        flexContainerId="user-info-left-side"
        direction="column"
        justify="center"
        align="center"
      >
        <Image
          className="bg-primary_white_200 rounded-full"
          src={userData?.image as string}
          alt="User Image"
          htmlWidth={150}
          htmlHeight={150}
        />
        <Button
          variant="primary"
          buttonId="logout-button"
          buttonType="button"
          className="w-full"
          onClick={() => {
            useAuthStore.setState({
              allUserData: null,
              token: null,
              userId: null
            })
          }}
        >
          <Typography
            className="text-primary_black_600"
            tagAs="span"
            weight="bold"
            text="Logout"
          />
        </Button>
      </FlexContainer>
      {/* RIGHT SIDE */}
      <FlexContainer
        className="w-[70%]"
        gap={5}
        flexContainerId="user-info-right-side"
        direction="column"
        justify="center"
        align="center"
      >
        <UserAdditionalInfo userData={userData} />
      </FlexContainer>
    </Box>
  )
}

export default SingleUserInfo
