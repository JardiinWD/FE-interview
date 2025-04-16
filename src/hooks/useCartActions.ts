import { useState } from 'react'
import { ICart, IProduct } from '@/api/types'
import { CartApi } from '@/api'
import { useAuthStore, useCartStore } from '@/store'
import { toast } from 'react-toastify'

// ------------ INTERFACES
export interface ICartActionsState {
  currentQuantity: number
  isLoading: boolean
}

export interface IUseCartActions {
  state: ICartActionsState
  retrieveCurrentQuantity: (quantity: number) => void
  onAddToCart: (product: Partial<ICart>, userId: number) => Promise<void>
  handleAddToCart: () => void
}

/**
 * @description Custom hook for cart actions
 * @param product - The product to add to cart
 * @returns Cart action state and functions
 */
export const useCartActions = (
  product: IProduct | undefined
): IUseCartActions => {
  // ------------ STATES
  const [state, setState] = useState<ICartActionsState>({
    currentQuantity: product?.minimumOrderQuantity as number,
    isLoading: false
  })

  // ------------ ZUSTAND STORE
  const userId = useAuthStore((state) => state.userId)
  const cartData = useCartStore((state) => state.cartData)
  const { createNewCart, updateCartWithNewProducts } = useCartStore()

  /**
   * @description Function to retrieve the current quantity of the product in the cart
   * @param {number} quantity - The current quantity of the product
   */
  const retrieveCurrentQuantity = (quantity: number) => {
    setState((prevState) => ({
      ...prevState,
      currentQuantity: quantity
    }))
  }

  /**
   * @description Function to handle the "Add to Cart" action
   * @param {Partial<ICart>} product - The product to add to the cart
   * @param {number} userId - The ID of the user
   */
  const onAddToCart = async (product: Partial<ICart>, userId: number) => {
    try {
      // Set Loading State
      setState((prevState) => ({
        ...prevState,
        isLoading: true
      }))

      // Invoke the API Call
      const { data, error, status } = await CartApi.addNewCart(
        userId,
        product as IProduct
      )

      // Check if the API Call was successful
      if (status !== 'success' || error) {
        toast.error(error as string)
        throw new Error(`Something went wrong with the API Call! --> ${error}`)
      }

      // Check if the Cart Data is empty
      if (!cartData) {
        // If the cart data is empty, create a new cart
        // @ts-ignore - TODO: Quick Fix before release
        createNewCart(data)
        toast.success(`Product Added to Cart Successfully!`)
      } else {
        // If the cart data is not empty, update the existing cart with new products
        const cartId = cartData[0].id
        // @ts-ignore - TODO: Quick Fix before release
        updateCartWithNewProducts(cartId, [data])
        toast.success(`Product Added to Cart Successfully!`)
      }
    } catch (error) {
      // Add toaster with the error message
      toast.error(error as string)
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false
      }))
    }
  }

  /**
   * @description Convenience function to add the current product to cart
   */
  const handleAddToCart = () => {
    if (!product || !userId) return

    onAddToCart(
      {
        quantity: state.currentQuantity,
        id: product.id
      },
      userId
    )
  }

  return {
    state,
    retrieveCurrentQuantity,
    onAddToCart,
    handleAddToCart
  }
}

export default useCartActions
