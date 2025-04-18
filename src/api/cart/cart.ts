// --> Documentation : https://dummyjson.com/docs/carts
import axios from 'axios'
import { ICartApi, TPromiseError, TCartApiContext, IProduct } from '@/api/types'
import { useAuthStore } from '@/store'

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
  },

  /**
   * @description Get a cart by an user ID
   * @param {number} id - The ID of the cart to be retrieved
   * @returns {Promise<ICartPromise>} - A promise that resolves to the cart data or an error
   */
  getCartByUserId: async (userId: number) => {
    try {
      // Retrieve the necessary Data from the API
      const userCartData = await cartApi.get(`/user/${userId}`)
      // Check if there's not any cart for the user
      if (userCartData.statusText !== 'OK' || !userCartData.data)
        throw new Error(`Something went wrong with getCartByUserId API Call!`)
      // Check if the user cart data is empty
      if (userCartData.data.carts.length === 0)
        throw new Error(`No cart found for user with id ${userId}`)
      // Return the proper Data format
      return {
        data: userCartData.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      return CartApi.handleCartErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the user id cart data',
        'getCartByUserId'
      )
    }
  },

  /**
   * @description Add a new cart for a user
   * @param {number} userId - The ID of the user for whom the cart is being created
   * @param {Partial<IProduct>} product - The product to be added to the cart
   * @returns {Promise<ICartPromise>} - A promise that resolves to the cart data or an error
   */
  addNewCart: async (userId: number, product: Partial<IProduct>) => {
    try {
      // Check if there is a userId or a product
      if (!userId || !product) throw new Error('User ID or Product is missing')
      // If there is a userId and a product, create the cart body
      const jsonData = JSON.stringify({
        userId: userId,
        products: [product]
      })
      // Send the request to the API
      const response = await cartApi.post('/add', jsonData)
      // Check if the response is valid
      if (response.statusText !== 'Created' || !response.data)
        throw new Error(`Something went Wrong with addNewCart API Call!`)
      // Return the data in the expected format
      return {
        data: response.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      return CartApi.handleCartErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the user id cart data',
        'getCartByUserId'
      )
    }
  },

  /**
   * @description Update a cart by its ID
   * @param {number} cartId - The ID of the cart to be updated
   * @param {Partial<IProduct>} product - The product to be added to the cart
   * @returns {Promise<ICartPromise>} - A promise that resolves to the cart data or an error
   */
  updateCart: async (product: Partial<IProduct>, cartId: number = 1) => {
    try {
      // Check if there is a cartId or a product
      if (!cartId || !product) throw new Error('Cart ID or Product is missing')
      // If there is a cartId and a product, create the cart body
      const jsonData = JSON.stringify({
        merge: true, // This will merge the new product with the existing ones
        products: [product]
      })
      // Send the request to the API
      const response = await cartApi.put(`/${cartId}`, jsonData)
      // Check if the response is valid
      if (response.statusText !== 'OK' || !response.data)
        throw new Error(`Something went Wrong with updateCart API Call!`)
      // Return the data in the expected format
      return {
        data: response.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      return CartApi.handleCartErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the user id cart data',
        'updateCart'
      )
    }
  },

  /**
   * @description Delete a cart by its ID
   * @param {number} cartId - The ID of the cart to be deleted
   * @returns {Promise<ICartPromise>} - A promise that resolves to the cart data or an error
   */
  deleteCart: async (cartId: number = 1) => {
    try {
      // Check if there is a cartId
      if (!cartId) throw new Error('Cart ID is missing')
      // Send the request to the API
      const response = await cartApi.delete(`/${cartId}`)
      // Check if the response is valid
      if (response.statusText !== 'OK' || !response.data)
        throw new Error(`Something went Wrong with deleteCart API Call!`)
      // Return the data in the expected format
      return {
        data: response.data,
        error: null,
        status: 'success'
      }
    } catch (error) {
      return CartApi.handleCartErrors(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the user id cart data',
        'deleteCart'
      )
    }
  }
}

// ----------- AXIOS INTERCEPTOR

// Add a request interceptor to include the access token in the headers
cartApi.interceptors.request.use(
  async (config) => {
    // Retrieve the token from the Zustand store
    const authState = useAuthStore.getState()
    // Get the access token from allUserData if it exists
    const accessToken = authState.allUserData?.accessToken || ''
    // If the access token exists, add it to the Authorization header
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error)
  }
)
