import { Images } from '@/assets/images'
import { FlexContainer, Image } from '@/components/atoms'
import { LoginForm } from '@/components/molecules'
import React, { JSX } from 'react'

const Login: React.FC = (): JSX.Element => {
  return (
    <FlexContainer
      direction="row"
      justify="center"
      align="center"
      wrap="nowrap"
      className="w-screen h-screen"
      flexContainerId="login-page"
    >
      {/* LOGIN ILLUSTRATION CONTAINER */}
      <FlexContainer
        direction="row"
        justify="center"
        align="center"
        className="!w-[50%] h-full"
        flexContainerId="login-illustration-container"
      >
        <Image
          src={Images.LoginIllustration}
          alt="Logo"
          htmlWidth={550}
          htmlHeight={550}
        />
      </FlexContainer>
      {/* LOGIN FORM CONTAINER */}
      <FlexContainer
        direction="row"
        justify="center"
        align="center"
        className="!w-[50%] bg-primary_yellow_600 h-full"
        flexContainerId="login-form-container"
      >
        <LoginForm onSubmit={(data) => console.log(data)} />
      </FlexContainer>
    </FlexContainer>
  )
}

export default Login
