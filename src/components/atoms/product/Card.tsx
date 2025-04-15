// TODO: Add Skeletons

import { CartApi } from '@/api'
import { ICart, IProduct } from '@/api/types'
import { Icons } from '@/assets/icons'
import {
  CartAction,
  DiscountPill,
  FlexContainer,
  Image,
  ProductRating,
  Typography
} from '@/components/atoms'
import { useAuthStore, useCartStore } from '@/store'
import { ICardProps } from '@/types/atoms'
import {
  handleRouondedRatingValue,
  transformNumberToCurrency,
  truncateLongText
} from '@/utils/functions'
import React, { JSX, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'

// ------------ INTERFACES
interface ICardFooterState {
  currentQuantity: number
  isLoading: boolean
}

/**
 * @description Card component
 * @param {string} title - The title of the product.
 * @param {string} description - The description of the product.
 * @param {string} imageSrc - The source URL of the product image.
 * @param {function} onAddToCart - The function to call when the "Add to Cart" button is clicked.
 * @param {IProduct} product - The product object.
 * @returns {JSX.Element}
 */
const Card: React.FC<ICardProps> = ({
  title = 'Product',
  description = 'Product Description',
  imageSrc = 'https://via.placeholder.com/300',
  product
}): JSX.Element => {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardImage title={title} imageSrc={imageSrc} />
      <CardBody title={title} product={product} description={description} />
      <CardFooter product={product} />
    </div>
  )
}

// ------------------ PRODUCT CARD IMAGE
const CardImage: React.FC<ICardProps> = ({
  imageSrc = 'https://via.placeholder.com/300',
  title = 'Product'
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="card-image"
      direction="row"
      justify="center"
      align="center"
    >
      <Image
        className="rounded-t-lg h-40 self-center"
        src={imageSrc}
        alt={title}
        fit="contain"
      />
    </FlexContainer>
  )
}

// ------------------ PRODUCT CARD BODY
const CardBody: React.FC<ICardProps> = ({
  title = 'Product',
  description = 'Product Description',
  product
}) => {
  return (
    <FlexContainer
      flexContainerId="card-body"
      direction="column"
      justify="center"
      align="flex-start"
      className="p-3"
    >
      {/* TITLE */}
      <Typography
        textColor="text-primary_black_700"
        weight="bold"
        tagAs="h5"
        text={title}
        className="mb-2 truncate tracking-tight"
      />
      {/* DESCRIPTION */}
      <Typography
        textColor="text-primary_black_500"
        weight="regular"
        tagAs="p"
        text={truncateLongText(description, 70)}
        className="mb-3 font-normal "
      />
      {/* RATING + STARS */}
      {product && product?.rating && (
        <div
          id="rating"
          className="flex mb-3 items-center space-x-1.5 rtl:space-x-reverse"
        >
          <Typography
            weight="bold"
            tagAs="span"
            textColor="text-primary_black_700"
            text={handleRouondedRatingValue(
              product?.rating as number
            ).toString()}
            className="tracking-tight"
          />
          <ProductRating rating={product?.rating as number} />
        </div>
      )}
    </FlexContainer>
  )
}

// ------------------ PRODUCT CARD FOOTER
const CardFooter: React.FC<ICardProps> = ({ product }) => {
  // ------------ STATES
  const [state, setState] = useState<ICardFooterState>({
    currentQuantity: product?.minimumOrderQuantity as number,
    isLoading: false
  })

  // ------------ ZUSTAND STORE
  const userId = useAuthStore((state) => state.userId)
  const cartData = useCartStore((state) => state.cartData)
  const { createNewCart, updateCartWithNewProducts } = useCartStore()

  // ------------ HANDLER

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
   * @param {Partial<IProduct>} product - The product to add to the cart
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
        toast.success('Cart Created Successfully!')
      } else {
        // If the cart data is not empty, update the existing cart with new products
        const cartId = cartData[0].id
        // @ts-ignore - TODO: Quick Fix before release
        updateCartWithNewProducts(cartId, [data])
        toast.success('Cart Updated Successfully!')
      }

      // TODO : Handle the API Response with ZUSTAND STORE
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

  return (
    <FlexContainer
      flexContainerId="card-footer"
      justify="space-between"
      align="center"
      direction="row"
      gap={2}
    >
      {/* PRODUCT PRICE */}
      <FlexContainer
        className="pb-4 px-4 w-full"
        flexContainerId="footer-actions"
        align="center"
        justify="space-between"
        direction="row"
        gap={2}
      >
        {product?.price && (
          <FlexContainer
            flexContainerId="price-and-discount"
            direction="row"
            gap={1}
            align="center"
            justify="center"
          >
            <Typography
              textColor="text-primary_black_700"
              weight="bold"
              tagAs="h5"
              text={transformNumberToCurrency(product?.price)}
              className="tracking-tight "
            />
            {product?.discountPercentage && (
              <DiscountPill
                discountPercentage={product?.discountPercentage as number}
              />
            )}
          </FlexContainer>
        )}
        {/* Check Eye Icon */}
        <Link
          to={`/product/${product?.id}`}
          state={{ product: product }}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <Icons.EyeIcon className="w-4 h-4 text-primary_black_500" />
        </Link>
      </FlexContainer>
      {/* FOOTER ACTION */}
      <FlexContainer
        className="p-4 pt-0 w-full"
        flexContainerId="footer-actions"
        align="center"
        justify="space-between"
        gap={2}
      >
        {/* CART ACTIONS */}
        <CartAction
          isLoading={state.isLoading}
          onAddToCart={() =>
            onAddToCart(
              {
                quantity: state.currentQuantity,
                id: product?.id
              },
              userId as number
            )
          }
          product={product as IProduct}
          onRetrieveCurrentQuantity={retrieveCurrentQuantity}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default Card
