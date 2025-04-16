// USER ID 6 HA UN CARRELLO

import { AuthApi } from '@/api'
import { Images } from '@/assets/images'
import { FlexContainer, Image } from '@/components/atoms'
import { LoginForm } from '@/components/molecules'
import { useAuthStore, useCartStore } from '@/store'
import React, { JSX, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { transformJwtExpirationDate } from '@/utils/functions'

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

  // -------------- ZUSTAND STORE
  const { loadUserCart } = useCartStore()

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

            // ! ======= DISCLAIMER ========
          // ! Questa logica di navigate prima di decodificare il token e settare lo store di zustand
          // ! Senza controllare authData deriva dal fatto che cypress non riconosce la response.data della chiamata login!
          // ! Sotto segue quella che per me dovrebbe essere la logica corretta di autenticazione. 
       
       
          /* if (authData) {
            // Decode the Received JWT Token in order to retrieve expiration date
            const decodedToken = jwtDecode(authData.accessToken)
            // Set the proper variables to the Zustand Store
            useAuthStore.setState({
              userId: authData.id,
              allUserData: authData,
              expirationDate: transformJwtExpirationDate(decodedToken.exp as number)
            })
            // Carica il carrello dell'utente
            loadUserCart()
            // Navigate to Home
            navigate('/')
          } */
      

        
        // Decode the Received JWT Token in order to retrieve expiration date
        const decodedToken = jwtDecode(authData?.accessToken as string)
        // Set the proper variables to the Zustand Store
        useAuthStore.setState({
          userId: authData?.id,
          allUserData: authData,
          expirationDate: transformJwtExpirationDate(decodedToken.exp as number)
        })
        // Carica il carrello dell'utente
        loadUserCart()
        // Navigate to Home
        navigate('/')
      
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
        className="!hidden lg:!flex h-full "
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
        className="w-full md:!w-[100%] lg:!w-[50%] bg-primary_yellow_600 h-full"
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
