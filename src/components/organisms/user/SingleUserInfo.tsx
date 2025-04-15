import { Button, FlexContainer, Image, Typography } from '@/components/atoms'
import { LogoutModal, UserAdditionalInfo } from '@/components/molecules'
import { useModalStore } from '@/store'
import { ISingleUserInfo } from '@/types/organisms'
import { Box } from '@chakra-ui/react'
import React, { JSX } from 'react'

/**
 * @description SingleUserInfo component to display single user information
 * @param {IAuthData} userData - user data to display
 */
const SingleUserInfo: React.FC<ISingleUserInfo> = ({
  userData
}): JSX.Element => {
  // -------------- ZUSTAND STORE
  const { openModal, isModalOpen } = useModalStore()

  return (
    <React.Fragment>
      <Box
        style={{
          boxShadow:
            '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
        }}
        className="bg-primary_white_100 lg:gap-2 gap-6 p-4 shadow-lg flex flex-col lg:flex-row flex-wrap lg:flex-nowrap xl:flex-nowrap  items-start justify-between"
        rounded="lg"
        height={'fit-content'}
        width={['100%', '80%', '80%']}
        id="user-info-box"
      >
        {/* LEFT SIDE */}
        <FlexContainer
          className="w-full lg:w-[25%]"
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
            onClick={openModal}
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
          className="w-full lg:w-[70%]"
          gap={5}
          flexContainerId="user-info-right-side"
          direction="column"
          justify="center"
          align="center"
        >
          <UserAdditionalInfo userData={userData} />
        </FlexContainer>
      </Box>
      {isModalOpen && (
        <LogoutModal
          aria-modal="true"
          modalId="logout-modal"
          isModalOpen={isModalOpen}
        />
      )}
    </React.Fragment>
  )
}

export default SingleUserInfo
