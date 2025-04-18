// --> Documentation : https://dummyjson.com/docs/auth

import axios from 'axios'
import { IAuthApi, TAuthApiContext, TPromiseError } from '@/api/types'

// ----------- API ISTANCE
const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_DUMMY_JSON_BASEURL}/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ----------- API LAYER
export const AuthApi: IAuthApi = {
  handleAuthenticationErrors: async (
    error: TPromiseError,
    context: TAuthApiContext
  ) => {
    console.error(`An error occured in ${context} --> ${error}`)
    return {
      error: error,
      status: 'error'
    }
  },
  /**
   * @description Handle the login process
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @returns {Promise<IAuthPromise>} - A promise that resolves to the authentication data or an error
   */
  handleLogin: async (username: string, password: string) => {
    try {
      // Check if the username and password are not empty
      if (!username || !password)
        throw new Error('Username and password are required')
      // Then create the request body with the username and password and custom expiresIn
      const requestBody = JSON.stringify({
        username: username,
        password: password,
        expiresIn: 30
      })

      // Retrieve the necessary Data from the API
      const response = await authApi.post('/login', requestBody)
      // Check if the response is valid
      if (response.statusText !== 'OK')
        throw new Error(`Something went Wrong with handleLogin API Call!`)
      // Return the data in the expected format
      return {
        data: response.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      // Handle the error using the handleAuthenticationError method
      return await AuthApi.handleAuthenticationErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the data',
        'handleLogin'
      )
    }
  }
}
