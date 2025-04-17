import { useEffect, useState } from 'react'
import { ICart, IProduct } from '@/api/types'
import { CartApi } from '@/api'
import { useAuthStore, useCartStore } from '@/store'
import { toast } from 'react-toastify'

// ------------ INTERFACES
export interface ICartActionsState {
  currentQuantity: number
  isLoading: boolean
  isMaxStockReached: boolean // Nuovo stato per tracciare se abbiamo raggiunto lo stock massimo
  isIncrementDisabled: boolean // Nuovo stato per tracciare se il bottone incremento deve essere disabilitato
  isDecrementDisabled: boolean // Nuovo stato per tracciare se il bottone decremento deve essere disabilitato
  isAddToCartDisabled: boolean // Nuovo stato per tracciare se il bottone "Add to Cart" deve essere disabilitato
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

  // ------------ ZUSTAND STORE
  const userId = useAuthStore((state) => state.userId)
  const cartData = useCartStore((state) => state.cartData)
  const { createNewCart, updateCartWithNewProducts, isProductMaxedOut, getProductQuantityInCart, getRemainingStock } = useCartStore()


  // ------------ OTHER CART ACTIONS (GLOBALIZED)
  const isMaxLimitReached = product ? isProductMaxedOut(product.id, product.stock || 0) : false; // Check if the product is maxed out
  const quantityInCart = product ? getProductQuantityInCart(product.id) : 0; // Get the quantity of the product in the cart
  const remainingStock = product ? getRemainingStock(product.id, product.stock || 0) : 0; // Get the remaining stock of the product
  const initialQuantity = product
    ? Math.min(product.minimumOrderQuantity || 1, remainingStock || 999)
    : 1;

  // ------------ STATES
  const [state, setState] = useState<ICartActionsState>({
    isLoading: false,
    currentQuantity: initialQuantity,
    isMaxStockReached: product ? initialQuantity >= (product.stock || 0) : false,
    isIncrementDisabled: product ? initialQuantity >= (product.stock || 0) : true,
    isDecrementDisabled: product ? initialQuantity <= (product.minimumOrderQuantity || 1) : true,
    isAddToCartDisabled: product ? product.stock <= 0 : true
  })



  /**
   * @description Function to retrieve the current quantity of the product in the cart
   * @param {number} quantity - The current quantity of the product
   */
  const retrieveCurrentQuantity = (quantity: number) => {
    if (!product) return;

    // Check if the quantity is less than the minimum order quantity
    const minQuantity = product.minimumOrderQuantity || 1;
    const maxQuantity = product.stock || 0;

    // Update the state with the new quantity and check if max stock is reached
    setState(prevState => ({
      ...prevState,
      currentQuantity: quantity,
      isMaxStockReached: quantity >= maxQuantity,
      isIncrementDisabled: quantity >= maxQuantity,
      isDecrementDisabled: quantity <= minQuantity,
      isAddToCartDisabled: maxQuantity <= 0 || quantity > maxQuantity
    }));
  }


  // ------------ USE EFFECT
  useEffect(() => {
    if (product) {
      const isMaxed = isProductMaxedOut(product.id, product.stock || 0);
      const remaining = getRemainingStock(product.id, product.stock || 0);
      const minQuantity = product.minimumOrderQuantity || 1;

      setState(prev => ({
        ...prev,
        isMaxStockReached: isMaxed || state.currentQuantity >= remaining,
        isIncrementDisabled: isMaxed || state.currentQuantity >= remaining,
        isDecrementDisabled: state.currentQuantity <= minQuantity,
        isAddToCartDisabled: isMaxed || remaining <= 0 || state.currentQuantity > remaining
      }));
    }
  }, [product, cartData]);

  /**
   * @description Function to handle the "Add to Cart" action
   * @param {Partial<ICart>} product - The product to add to the cart
   * @param {number} userId - The ID of the user
   */
  const onAddToCart = async (product: Partial<ICart>, userId: number) => {
    try {
      if (state.isAddToCartDisabled) {
        toast.error('Cannot add more items than available in stock');
        return;
      }


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
      // After we're done with the API Call, we need to check if the product is in stock
      if (product && state.currentQuantity >= (product?.stock || 0)) {
        setState(prev => ({
          ...prev,
          isAddToCartDisabled: true
        }));
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
    onAddToCart({ quantity: state.currentQuantity, id: product.id }, userId)
  }

  return {
    state,
    retrieveCurrentQuantity,
    onAddToCart,
    handleAddToCart
  }
}

export default useCartActions
