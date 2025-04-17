import { ICart, IProduct } from '@/api/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from '@/store'
import { validateQuantity } from '@/utils/functions'

interface IProductWithQuantity extends IProduct {
  quantity?: number
}

interface ICartStore {
  // --> State
  cartData: ICart[] | null

  // --> Actions
  createNewCart: (cartData: ICart) => void
  updateCartWithNewProducts: (cartId: number, products: ICart[]) => void
  removeProductFromCart: (cartId: number, productId: number) => void // New action to remove a product from the cart
  clearCart: () => void // New action to clear the cart
  loadUserCart: () => void // New action to load user-specific cart

  // --> Stock Handlers
  isProductMaxedOut: (productId: number, stock: number) => boolean
  getProductQuantityInCart: (productId: number) => number
  getRemainingStock: (productId: number, totalStock: number) => number
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

      /**
       * @description Update the cart with new products
       * @param {number} cartId - The ID of the cart to update
       * @param {ICart[]} newProducts - The new products to add to the cart
       * @returns {void}
       */
      updateCartWithNewProducts: (cartId: number, newProducts: ICart[]) =>
        set((state) => {
          // If state is null, return state without changes
          if (!state.cartData) return state
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

              // Create a copy of existing products
              const updatedProducts = [...cart.products]

              // For each new product
              productsToAdd.forEach((newProduct) => {
                // Find the index of existing product with the same ID
                const existingIndex = updatedProducts.findIndex(
                  (p) => p.id === newProduct.id
                )

                if (existingIndex >= 0) {
                  // If the product already exists, keep the original discounted prices
                  // but update the quantity
                  const originalProduct = updatedProducts[existingIndex]
                  const requestedQuantity =
                    (originalProduct.quantity || 0) + (newProduct.quantity || 1)

                  // Validate quantity against min/max constraints
                  const validatedQuantity = validateQuantity(
                    originalProduct as IProduct,
                    requestedQuantity
                  )

                  // Calculate the new total price of the product based on the new quantity
                  const newTotal =
                    (originalProduct.price || 0) * validatedQuantity

                  // Calculate the new discounted price based on the original discount percentage
                  const discountPercentage =
                    originalProduct.discountPercentage || 0
                  const newDiscountedPrice =
                    newTotal * (1 - discountPercentage / 100)

                  updatedProducts[existingIndex] = {
                    ...originalProduct,
                    quantity: validatedQuantity,
                    total: newTotal,
                    discountedPrice: newDiscountedPrice
                  }
                } else {
                  // For new products, validate quantity before adding
                  const validatedQuantity = validateQuantity(
                    newProduct as IProduct,
                    newProduct.quantity || 1
                  )

                  // Calculate correct total based on validated quantity
                  const total = (newProduct.price || 0) * validatedQuantity

                  // Calculate correct discounted price
                  const discountPercentage = newProduct.discountPercentage || 0
                  const discountedPrice = total * (1 - discountPercentage / 100)

                  // Add the product with validated quantity and correct price calculations
                  updatedProducts.push({
                    ...newProduct,
                    quantity: validatedQuantity,
                    total: total,
                    discountedPrice: discountedPrice
                  })
                }
              })

              // Calculate new totals - using the correct values from each product
              const totalProducts = updatedProducts.length
              const totalQuantity = updatedProducts.reduce(
                (sum, p) => sum + (p.quantity || 1),
                0
              )

              // Calculate the total by summing up the totals of individual products
              const total = updatedProducts.reduce(
                (sum, p) =>
                  sum + (p.total || (p.price || 0) * (p.quantity || 1)),
                0
              )

              // Calculate the discounted total by summing up the discounted prices of individual products
              const discountedTotal = updatedProducts.reduce(
                (sum, p) => sum + (p.discountedPrice || p.total || 0),
                0
              )

              // Create a new cart with updated products and totals
              return {
                ...cart,
                products: updatedProducts,
                totalProducts,
                totalQuantity,
                total,
                discountedTotal
              }
            }
            // Return cart unchanged if IDs don't match
            return cart
          })

          // Return updated state
          return { cartData: updatedCart }
        }),

      /**
       * @description Remove a specific product from the cart
       * @param {number} cartId - The ID of the cart containing the product
       * @param {number} productId - The ID of the product to remove
       */
      removeProductFromCart: (cartId: number, productId: number) =>
        set((state) => {
          // If state is null, return state without changes
          if (!state.cartData) return state

          // Create a deep copy of the cart array
          const updatedCart = state.cartData.map((cart) => {
            // If the cart ID matches, we remove the product
            if (cart.id === cartId) {
              // Filter out the product with the matching ID
              const filteredProducts = cart.products.filter(
                (p) => p.id !== productId
              )

              // Calculate new totals
              const totalProducts = filteredProducts.length
              const totalQuantity = filteredProducts.reduce(
                (sum, p) => sum + ((p as IProductWithQuantity).quantity || 1),
                0
              )

              // Calculate the total by summing up the price * quantity for each product
              const total = filteredProducts.reduce((sum, p) => {
                // Validate quantity against min/max constraints
                const validatedQuantity = validateQuantity(
                  p as IProduct,
                  (p as IProductWithQuantity).quantity || 1
                )

                return sum + (p.price || 0) * validatedQuantity
              }, 0)

              // Calculate the discounted total by summing up the discounted prices
              const discountedTotal = filteredProducts.reduce((sum, p) => {
                // Validate quantity against min/max constraints
                const validatedQuantity = validateQuantity(
                  p as IProduct,
                  (p as IProductWithQuantity).quantity || 1
                )

                // If the product already has a discountedPrice, use it
                if (p.discountedPrice !== undefined) {
                  // Recalculate based on validated quantity if needed
                  const originalQuantity =
                    (p as IProductWithQuantity).quantity || 1
                  if (validatedQuantity !== originalQuantity) {
                    return (
                      sum +
                      (p.discountedPrice / originalQuantity) * validatedQuantity
                    )
                  }
                  return sum + p.discountedPrice
                }

                // Otherwise, calculate the discounted price using discountPercentage
                const productTotal = (p.price || 0) * validatedQuantity
                const discount =
                  productTotal * ((p.discountPercentage || 0) / 100)
                return sum + (productTotal - discount)
              }, 0)

              // Create a new cart with updated products and totals
              return {
                ...cart,
                products: filteredProducts,
                totalProducts,
                totalQuantity,
                total,
                discountedTotal // Added the updated discountedTotal
              }
            }
            // Return cart unchanged if IDs don't match
            return cart
          })

          // Handle case where a cart becomes empty (no products)
          const nonEmptyCarts = updatedCart.filter(
            (cart) => cart.products.length > 0
          )

          // If all carts are empty, return null for cartData
          if (nonEmptyCarts.length === 0) {
            return { cartData: null }
          }

          // Return updated state with non-empty carts
          return { cartData: nonEmptyCarts }
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
      },

      // Check if a product is maxed out in the cart
      isProductMaxedOut: (productId, stock) => {
        const { cartData } = get()
        if (!cartData || cartData.length === 0) return false

        // Find the product in the cart
        let totalQuantityInCart = 0

        cartData.forEach((cart) => {
          const productInCart = cart.products.find((p) => p.id === productId)
          if (productInCart) totalQuantityInCart += productInCart.quantity || 0
        })

        return totalQuantityInCart >= stock
      },

      // Get the quantity of a specific product in the cart
      getProductQuantityInCart: (productId) => {
        const { cartData } = get()
        if (!cartData || cartData.length === 0) return 0

        // Sum the quantities of the product in all carts
        let totalQuantity = 0

        cartData.forEach((cart) => {
          // Find the product in the cart
          const productInCart = cart.products.find((p) => p.id === productId)
          if (productInCart) totalQuantity += productInCart.quantity || 0
        })
        // Return the total quantity of the product in all carts
        return totalQuantity
      },

      // Get the remaining stock of a product
      getRemainingStock: (productId, totalStock) => {
        const quantityInCart = get().getProductQuantityInCart(productId)
        return Math.max(0, totalStock - quantityInCart)
      }
    }),
    {
      name: 'sikuro-cart-store',
      partialize: (state) => ({
        cartData: state.cartData
      }),
      storage: {
        getItem: (name) => {
          // Get the user ID from the auth store
          const userId = useAuthStore.getState().userId
          // If no user ID, return null
          if (!userId) return null

          const key = `${name}-${userId}`
          const value = localStorage.getItem(key)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => {
          // Get the user ID from the auth store
          const userId = useAuthStore.getState().userId
          // If no user ID, do not save anything
          if (!userId) return
          // Create a unique key for the user
          const key = `${name}-${userId}`
          // Convert the value to a string and save it
          localStorage.setItem(key, JSON.stringify(value))
        },
        removeItem: (name) => {
          // Get the user ID from the auth store
          const userId = useAuthStore.getState().userId
          // If no user ID, do not remove anything
          if (!userId) return
          // Create a unique key for the user
          const key = `${name}-${userId}`
          // Remove the cart data from localStorage
          localStorage.removeItem(key)
        }
      }
    }
  )
)

export default useCartStore
