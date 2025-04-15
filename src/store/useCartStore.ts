import { ICart } from '@/api/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useAuthStore from './useAuthStore' // Import the auth store to retrieve the userId

interface ICartStore {
  // --> State
  cartData: ICart[] | null // Holds the cart data, which can be null or an array of ICart objects

  // --> Actions
  createNewCart: (cartData: ICart) => void // Action to create a new cart
  updateCart: (cartId: number, cartData: ICart) => void // Action to update an existing cart
  deleteCart: (cartId: number) => void // Action to delete a cart by its ID
  clearCart: () => void // Action to clear the cart data
}

const useCartStore = create<ICartStore>()(
  persist(
    (set) => ({
      // --> Initial state
      cartData: null, // Initially, the cart data is null

      // --> Actions

      /**
       * Creates a new cart and adds it to the existing cart data.
       * If no cart data exists, it initializes the cart with the new cart.
       */
      createNewCart: (cartData: ICart) =>
        set((state) => ({
          cartData: state.cartData ? [...state.cartData, cartData] : [cartData]
        })),

      /**
       * Updates an existing cart by its ID.
       * If the cart ID matches, it replaces the cart with the new data.
       */
      updateCart: (cartId: number, cartData: ICart) =>
        set((state) => {
          const updatedCartData =
            state.cartData?.map((cart) =>
              cart.id === cartId ? cartData : cart
            ) || []
          return { cartData: updatedCartData }
        }),

      /**
       * Deletes a cart by its ID.
       * Filters out the cart with the specified ID from the cart data.
       */
      deleteCart: (cartId: number) =>
        set((state) => {
          const updatedCartData =
            state.cartData?.filter((cart) => cart.id !== cartId) || []
          return { cartData: updatedCartData }
        }),

      /**
       * Clears all cart data by setting it to null.
       */
      clearCart: () => set({ cartData: null })
    }),
    {
      // --> Persistence Configuration
      name: 'sikuro-cart-store',

      /**
       * @description Specifies which parts of the state should be persisted.
       * @param {ICartStore} state - The current state of the store
       */
      partialize: (state) => ({
        cartData: state.cartData
      }),

      // --> Custom Storage Definition (based on userId)
      storage: {
        /**
         * Retrieves the cart data from localStorage for the current user.
         * The key is generated using the base name and the userId.
         */
        getItem: (name) => {
          // Retrieve the userId from the auth store
          const userId = useAuthStore.getState().userId
          const value = localStorage.getItem(`${name}-${userId}`)
          // Parse the JSON value or return null if not found
          return value ? JSON.parse(value) : null
        },

        /**
         * @description Saves the cart data to localStorage for the current user.
         * @param {string} name - The name of the item to save
         */
        setItem: (name, value) => {
          // Retrieve the userId from the auth store
          const userId = useAuthStore.getState().userId
          // Save the value as a JSON string
          localStorage.setItem(`${name}-${userId}`, JSON.stringify(value))
        },

        /**
         * @description Removes the cart data from localStorage for the current user.
         * @param {string} name - The name of the item to remove
         */
        removeItem: (name) => {
          // Retrieve the userId from the auth store
          const userId = useAuthStore.getState().userId
          // Remove the item from localStorage
          localStorage.removeItem(`${name}-${userId}`)
        }
      }
    }
  )
)

export default useCartStore
