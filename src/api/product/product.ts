// --> Documentation : https://dummyjson.com/docs/products
import axios from 'axios'
import {
  IProductApi,
  TPromiseError,
  TProductApiContext,
  IProductQueryParams,
  IProduct
} from '@/api/types'

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
  // @ts-expect-error Something went wrong with the API
  getProductById: async (id: number) => {
    try {
      // 1. Check if the category is provided
      if (!id) throw new Error('Product ID is required')
      // 2. Retrieve the necessary Data from the API
      const response = await productApi.get(`/${id}`)
      // Check if the response is valid
      if (!response.data)
        throw new Error(`Something went Wrong with getProductsByID API Call!`)
      // Return the data in the expected format
      return {
        data: response.data as IProduct,
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
  },
  getProducts: async (queryParams?: IProductQueryParams) => {
    try {
      let productUrl: string = '/'
      // Check if there are query params
      if (queryParams) {
        // Destructure the query params
        const { limit, skip, order, sortBy } = queryParams
        // Define Params Object and simplify the URL pattern
        const qParams = {
          limit: limit || 0,
          skip: skip || 0,
          order: order || 'asc',
          sortBy: sortBy || 'id'
        }
        // Set the URL with the query params
        productUrl = `/?limit=${qParams.limit}&skip=${qParams.skip}&order=${qParams.order}&sortBy=${qParams.sortBy}`
      }
      // Retrieve the necessary Data from the API
      const response = await productApi.get(productUrl)
      // Check if the response is valid
      if (!response.data)
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
  },
  getProductsByCategory: async (category?: string) => {
    try {
      // 1. Check if the category is provided
      if (!category) throw new Error('Category is required')
      // 2. Retrieve the necessary Data from the API
      const response = await productApi.get(`/category/${category}`)
      // Check if the response is valid
      if (!response.data)
        throw new Error(
          `Something went Wrong with getProductsByCategory API Call!`
        )
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
        'getProductsByCategory'
      )
    }
  }
}
