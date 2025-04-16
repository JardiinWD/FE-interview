// TODO: Add Skeletons

import { IProduct } from '@/api/types'
import { Icons } from '@/assets/icons'
import {
  CartAction,
  DiscountPill,
  FlexContainer,
  LazyImage,
  ProductRating,
  Spinner,
  Typography
} from '@/components/atoms'
import { useCartActions } from '@/hooks'
import { ICardProps } from '@/types/atoms'
import {
  handleRouondedRatingValue,
  transformNumberToCurrency,
  truncateLongText
} from '@/utils/functions'
import React, { JSX } from 'react'
import { Link } from 'react-router'

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
      <LazyImage
        placeholder={<Spinner width="2rem" height="2rem" />}
        className="rounded-t-lg h-40 object-contain self-center"
        src={imageSrc}
        alt={title}
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
        textId={`product-${title}`}
        textColor="text-primary_black_700"
        weight="bold"
        tagAs="h5"
        text={title}
        className="mb-2 truncate tracking-tight"
      />
      {/* DESCRIPTION */}
      <Typography
        textId={`product-${description}`}
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
            textId={`product-${product?.rating}`}
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
  // ------------ CUSTOM HOOK
  const { state, retrieveCurrentQuantity, handleAddToCart } =
    useCartActions(product)

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
              textId={`product-price-${product?.price}`}
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
          state={{ productId: product?.id }}
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
          containerClassName='w-full min-w-full'
          counterClassName='lg:w-2/2'
          buttonClassName='lg:w-2/2'
          isLoading={state.isLoading}
          onAddToCart={handleAddToCart}
          product={product as IProduct}
          onRetrieveCurrentQuantity={retrieveCurrentQuantity}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default Card
