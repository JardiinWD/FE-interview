// --> Documentation : https://dummyjson.com/docs/products
import axios from 'axios'
import { IProductApi, TPromiseError, TProductApiContext } from '@/api/types'

// ----------- API ISTANCE
const productApi = axios.create({
  baseURL: `${import.meta.env.VITE_DUMMY_JSON_BASEURL}/products`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ------------ API LAYER
export const ProductApi: IProductApi = {
  handleProductErrors: async (
    error: TPromiseError,
    context: TProductApiContext
  ) => {
    console.error(`An error occured in ${context} --> ${error}`)
    return {
      error: error,
      status: 'error'
    }
  },
  getProducts: async () => {
    try {
      // Retrieve the necessary Data from the API
      const response = await productApi.get('/')
      // Check if the response is valid
      if (response.statusText !== 'OK' || !response.data)
        throw new Error(`Something went Wrong with getProducts API Call!`)
      // Return the data in the expected format
      return {
        data: response.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      // Handle the error using the handleProductError method
      return await ProductApi.handleProductErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the data',
        'getProducts'
      )
    }
  }
}
