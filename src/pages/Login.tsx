import { AuthApi } from '@/api'
import { Images } from '@/assets/images'
import { FlexContainer, Image } from '@/components/atoms'
import { LoginForm } from '@/components/molecules'
import { useAuthStore } from '@/store'
import React, { JSX, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IState {
  authenticationError: string | null
}

const Login: React.FC = (): JSX.Element => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    authenticationError: null
  })

  // -------------- HOOKS
  const navigate = useNavigate()

  // -------------- HANDLERS

  /**
   * @description handleLogin function to handle the login process
   * @param {data} data - The data object containing username and password
   */
  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      // Invoke the API call to handle login
      const {
        data: authData,
        error: authError,
        status: authStatus
      } = await AuthApi.handleLogin(data.username, data.password)
      // If there are Any error occured then catch it
      if (authError || authStatus !== 'success')
        throw new Error(`${authError as string}`)
      // Else if the response is valid then set the token and userId in the store
      if (authData) {
        // Set the proper accessToken
        useAuthStore.setState({
          token: authData.accessToken,
          userId: authData.id
        })
        // Navigate to Home
        navigate('/')
      }
    } catch (error) {
      console.error('Something Went Wrong during Authentication!', error)
      setState((prevState) => ({
        ...prevState,
        authenticationError: error instanceof Error ? error.message : null
      }))
    }
  }

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
        <LoginForm
          authenticationError={state.authenticationError as string}
          onSubmit={handleLogin}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default Login
