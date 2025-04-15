import { ICart, IProduct } from '@/api/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useAuthStore from './useAuthStore'

interface IProductWithQuantity extends IProduct {
  quantity?: number
}

interface ICartStore {
  // --> State
  cartData: ICart[] | null

  // --> Actions
  createNewCart: (cartData: ICart) => void
  updateCartWithNewProducts: (cartId: number, products: ICart[]) => void
  clearCart: () => void // New action to clear the cart
  loadUserCart: () => void // New action to load user-specific cart
}

const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      // --> Initial state
      cartData: null,

      // --> Actions
      createNewCart: (cartData: ICart) =>
        set((state) => ({
          cartData: state.cartData ? [...state.cartData, cartData] : [cartData]
        })),

      updateCartWithNewProducts: (cartId: number, newProducts: ICart[]) =>
        set((state) => {
          // If state is null, return state without changes
          if (!state.cartData) return state

          console.log('Updating cart with new products:', {
            cartId,
            newProducts
          })

          // Create a deep copy of the cart array
          const updatedCart = state.cartData.map((cart) => {
            // If the cart ID matches, we update the products
            if (cart.id === cartId) {
              // Extract products from the new cart (should be in the "products" field)
              const productsToAdd = newProducts.flatMap((newProd) => {
                // If newProd is an ICart with a products array, take that
                if (
                  newProd &&
                  newProd.products &&
                  Array.isArray(newProd.products)
                ) {
                  return newProd.products
                }
                // If newProd is a product itself (not a cart), return it directly
                return newProd
              })

              console.log('Products to add:', productsToAdd)

              // Create a copy of existing products
              const updatedProducts = [...cart.products]

              // For each new product
              productsToAdd.forEach((newProduct) => {
                // Find the index of existing product with the same ID
                const existingIndex = updatedProducts.findIndex(
                  (p) => p.id === newProduct.id
                )

                if (existingIndex >= 0) {
                  // If the product already exists, update its properties
                  updatedProducts[existingIndex] = {
                    ...updatedProducts[existingIndex],
                    ...newProduct,
                    // Update quantity by adding (if available)
                    quantity:
                      ((updatedProducts[existingIndex] as IProductWithQuantity)
                        .quantity || 0) +
                      ((newProduct as IProductWithQuantity).quantity || 1)
                  }
                } else {
                  // If product does not exist, add it
                  updatedProducts.push(newProduct)
                }
              })

              // Calculate new totals
              const totalProducts = updatedProducts.length
              const totalQuantity = updatedProducts.reduce(
                (sum, p) => sum + ((p as IProductWithQuantity).quantity || 1),
                0
              )
              const total = updatedProducts.reduce(
                (sum, p) =>
                  sum +
                  (p.price || 0) * ((p as IProductWithQuantity).quantity || 1),
                0
              )

              // Create a new cart with updated products
              return {
                ...cart,
                products: updatedProducts,
                totalProducts,
                totalQuantity,
                total
              }
            }
            // Return cart unchanged if IDs don't match
            return cart
          })

          console.log('Updated cart:', updatedCart)

          // Return updated state
          return { cartData: updatedCart }
        }),

      // Clear the cart (useful for logout)
      clearCart: () => set({ cartData: null }),

      // Load user-specific cart
      loadUserCart: () => {
        const userId = useAuthStore.getState().userId
        if (!userId) {
          // If no user is logged in, clear the cart
          set({ cartData: null })
          return
        }

        // Try to load the cart from localStorage
        const storageKey = `sikuro-cart-store-${userId}`
        const storedData = localStorage.getItem(storageKey)

        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData)
            // Only set the cart if it has the expected format
            if (parsedData && parsedData.state && parsedData.state.cartData) {
              set({ cartData: parsedData.state.cartData })
            } else {
              set({ cartData: null })
            }
          } catch (e) {
            console.error('Failed to parse cart data', e)
            set({ cartData: null })
          }
        } else {
          // No stored data for this user
          set({ cartData: null })
        }
      }
    }),
    {
      name: 'sikuro-cart-store',
      partialize: (state) => ({
        cartData: state.cartData
      }),
      storage: {
        getItem: (name) => {
          const userId = useAuthStore.getState().userId
          if (!userId) {
            console.log('No user logged in, returning empty cart')
            return null
          }

          const key = `${name}-${userId}`
          console.log(`Loading cart for user ${userId} with key ${key}`)
          const value = localStorage.getItem(key)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => {
          const userId = useAuthStore.getState().userId
          if (!userId) {
            console.log('No user logged in, not saving cart')
            return
          }

          const key = `${name}-${userId}`
          console.log(`Saving cart for user ${userId} with key ${key}`)
          localStorage.setItem(key, JSON.stringify(value))
        },
        removeItem: (name) => {
          const userId = useAuthStore.getState().userId
          if (!userId) return

          const key = `${name}-${userId}`
          localStorage.removeItem(key)
        }
      }
    }
  )
)

export default useCartStore
