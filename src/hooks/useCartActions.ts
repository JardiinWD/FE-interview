import { useEffect, useState } from 'react'
import { ICart, IProduct } from '@/api/types'
import { CartApi } from '@/api'
import { useAuthStore, useCartStore } from '@/store'
import { toast } from 'react-toastify'

// ------------ INTERFACES
export interface ICartActionsState {
  currentQuantity: number
  isLoading: boolean
  isMaxStockReached: boolean
  isIncrementDisabled: boolean
  isDecrementDisabled: boolean
  isAddToCartDisabled: boolean
}

export interface IUseCartActions {
  state: ICartActionsState
  retrieveCurrentQuantity: (quantity: number) => void
  onAddToCart: (product: Partial<ICart>, userId: number) => Promise<void>
  handleAddToCart: () => void
}

/**
 * @description Custom hook for cart actions
 * @param product - The product or cart item to interact with
 * @returns Cart action state and functions
 */
export const useCartActions = (
  product: IProduct | undefined
): IUseCartActions => {
  // ------------ ZUSTAND STORE
  const userId = useAuthStore((state) => state.userId)
  const cartData = useCartStore((state) => state.cartData)
  const {
    createNewCart,
    updateCartWithNewProducts,
    isProductMaxedOut,
    getRemainingStock
  } = useCartStore()

  // ------------ DETERMINE PRODUCT TYPE
  // Check if this is a cart item by detecting if it has quantity property
  const isCartItem = product && 'quantity' in product

  // ------------ CALCULATE REMAINING STOCK
  const remainingStock = product
    ? isCartItem
      ? product.stock || 0
      : getRemainingStock(product.id, product.stock || 0)
    : 0

  // ------------ CALCULATE INITIAL QUANTITY
  const initialQuantity = product
    ? isCartItem
      ? (product as unknown as ICart).quantity || 0
      : Math.min(product.minimumOrderQuantity || 1, remainingStock || 999)
    : 1

  // ------------ STATES
  const [state, setState] = useState<ICartActionsState>({
    isLoading: false,
    currentQuantity: initialQuantity,
    isMaxStockReached: product
      ? initialQuantity >= (product.stock || 0)
      : false,
    isIncrementDisabled: product
      ? initialQuantity >= (product.stock || 0)
      : true,
    isDecrementDisabled: product
      ? initialQuantity <= (product.minimumOrderQuantity || 1)
      : true,
    isAddToCartDisabled: product ? product.stock <= 0 : true
  })

  /**
   * @description Function to retrieve the current quantity of the product
   * @param {number} quantity - The current quantity of the product
   */
  const retrieveCurrentQuantity = (quantity: number) => {
    if (!product) return

    // Get proper constraints based on product type
    const minQuantity = product.minimumOrderQuantity || 1
    const maxQuantity = product.stock || (isCartItem ? 100 : 0)

    // Log for debugging
    /*     console.log('CartAction - retrieveCurrentQuantity:', {
          quantity,
          minQuantity,
          maxQuantity,
          isCartItem
        }) */

    // Update the state with the new quantity and check limits
    setState((prevState) => ({
      ...prevState,
      currentQuantity: quantity,
      isMaxStockReached: quantity >= maxQuantity,
      isIncrementDisabled: quantity >= maxQuantity,
      isDecrementDisabled: quantity <= minQuantity,
      isAddToCartDisabled: maxQuantity <= 0 || quantity > maxQuantity
    }))
  }

  // ------------ UPDATE STATE BASED ON PRODUCT AND CART DATA
  useEffect(() => {
    if (product) {
      if (isCartItem) {
        // For cart items, use direct values from the item
        const minQuantity = product.minimumOrderQuantity || 1
        const maxQuantity = product.stock || 100

        setState((prev) => ({
          ...prev,
          isMaxStockReached: state.currentQuantity >= maxQuantity,
          isIncrementDisabled: state.currentQuantity >= maxQuantity,
          isDecrementDisabled: state.currentQuantity <= minQuantity,
          isAddToCartDisabled:
            maxQuantity <= 0 || state.currentQuantity > maxQuantity
        }))
      } else {
        // For regular products, use store logic for remaining stock
        const isMaxed = isProductMaxedOut(product.id, product.stock || 0)
        const remaining = getRemainingStock(product.id, product.stock || 0)
        const minQuantity = product.minimumOrderQuantity || 1

        setState((prev) => ({
          ...prev,
          isMaxStockReached: isMaxed || state.currentQuantity >= remaining,
          isIncrementDisabled: isMaxed || state.currentQuantity >= remaining,
          isDecrementDisabled: state.currentQuantity <= minQuantity,
          isAddToCartDisabled:
            isMaxed || remaining <= 0 || state.currentQuantity > remaining
        }))
      }
    }
  }, [product, cartData, state.currentQuantity])

  /**
   * @description Function to handle the "Add to Cart" action
   * @param {Partial<ICart>} product - The product to add to the cart
   * @param {number} userId - The ID of the user
   */
  const onAddToCart = async (product: Partial<ICart>, userId: number) => {
    try {
      if (state.isAddToCartDisabled) {
        toast.error('Cannot add more items than available in stock')
        return
      }

      // Set Loading State
      setState((prevState) => ({
        ...prevState,
        isLoading: true
      }))

      // Store original product values before API call
      const originalProductStock = product?.stock
      const originalProductMinimumOrderQuantity = product?.minimumOrderQuantity

      /*       console.log('Original product values:', {
              id: product.id,
              stock: originalProductStock,
              minimumOrderQuantity: originalProductMinimumOrderQuantity
            }) */

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

      // Enhance API response with original product properties
      const suitableForCartData = {
        ...data,
        products: Array.isArray(data?.products)
          ? data?.products.map((p: any) => ({
              ...p,
              // Preserve stock and minimumOrderQuantity from original product
              stock: p.id === product.id ? originalProductStock : p.stock,
              minimumOrderQuantity:
                p.id === product.id
                  ? originalProductMinimumOrderQuantity
                  : p.minimumOrderQuantity
            }))
          : []
      }

      console.log('Enhanced cart data:', suitableForCartData)

      // Check if the Cart Data is empty
      if (!cartData) {
        // If the cart data is empty, create a new cart
        // @ts-expect-error - Something is wrong with the types
        createNewCart(suitableForCartData)
        toast.success(`Product Added to Cart Successfully!`)
      } else {
        // If the cart data is not empty, update the existing cart with new products
        const cartId = cartData[0].id
        // @ts-expect-error - Something is wrong with the types
        updateCartWithNewProducts(cartId, [suitableForCartData])
        toast.success(`Product Added to Cart Successfully!`)
      }

      // Check if product is at max stock after adding
      if (product && state.currentQuantity >= (originalProductStock || 0)) {
        setState((prev) => ({
          ...prev,
          isAddToCartDisabled: true
        }))
      }
    } catch (error) {
      // Show error message
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

    // Pass all important properties, not just id and quantity
    onAddToCart(
      {
        id: product.id,
        quantity: state.currentQuantity,
        stock: product.stock,
        minimumOrderQuantity: product.minimumOrderQuantity,
        price: product.price,
        title: product.title,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail
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
