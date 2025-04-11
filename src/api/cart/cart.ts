// --> Documentation : https://dummyjson.com/docs/carts
import axios from 'axios'
import { ICartApi, TPromiseError, TCartApiContext } from '@/api/types'

// ----------- API ISTANCE
const cartApi = axios.create({
  baseURL: `${import.meta.env.VITE_DUMMY_JSON_BASEURL}/carts`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ----------- API LAYER
export const CartApi: ICartApi = {
  handleCartErrors: async (error: TPromiseError, context: TCartApiContext) => {
    console.error(`An error occured in ${context} --> ${error}`)
    return {
      data: [],
      error: error,
      status: 'error'
    }
  },
  getCarts: async () => {
    try {
      // Retrieve the necessary Data from the API
      const response = await cartApi.get('/')
      // Check if the response is valid
      if (response.statusText !== 'OK' || !response.data)
        throw new Error(`Something went Wrong with getCarts API Call!`)
      // Return the data in the expected format
      return {
        data: response.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      // Handle the error using the handleCartError method
      return await CartApi.handleCartErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the data',
        'getCarts'
      )
    }
  }
}
