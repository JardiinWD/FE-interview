import React, { JSX } from 'react'
import {
  Typography,
  Image,
  Button,
  ProductRating,
  FlexContainer
} from '@/components/atoms'
import { IProductCardProps, IProductDiscountProps } from '@/types/atoms'
import { Link } from 'react-router'
import { handleRouondedRatingValue, truncateLongText } from '@/utils/functions'
import { Icons } from '@/assets/icons'

// ------------------ PRODUCT CARD DISCOUNT PRICE
const ProductDiscount: React.FC<IProductDiscountProps> = ({
  discountPercentage = 0
}) => {
  return (
    <div className="bg-red-300 text-white p-1 rounded-lg">
      <Typography
        textColor="text-primary_black_700"
        weight="bold"
        tagAs="span"
        text={`${discountPercentage}%`}
        className="tracking-tight"
      />
    </div>
  )
}

// ------------------ PRODUCT CARD IMAGE
const ProductCardImage: React.FC<IProductCardProps> = ({
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
        className="rounded-t-lg h-48 self-center"
        src={imageSrc}
        alt={title}
        fit="contain"
      />
    </FlexContainer>
  )
}

// ------------------ PRODUCT CARD BODY
const ProductCardBody: React.FC<IProductCardProps> = ({
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
      className="p-5"
    >
      {/* TITLE */}
      <Typography
        textColor="text-primary_black_700"
        weight="bold"
        tagAs="h4"
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
const ProductCardFooter: React.FC<IProductCardProps> = ({
  product,
  onAddToCart = () => {}
}) => {
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
        className="pb-4 pl-4"
        flexContainerId="footer-actions"
        align="center"
        justify="space-between"
        gap={2}
      >
        {product?.price && (
          <React.Fragment>
            <Typography
              textColor="text-primary_black_700"
              weight="bold"
              tagAs="h5"
              text={`$${product?.price}`}
              className="tracking-tight "
            />
            {product?.discountPercentage && (
              <ProductDiscount
                discountPercentage={product?.discountPercentage as number}
              />
            )}
          </React.Fragment>
        )}
      </FlexContainer>
      {/* FOOTER ACTION */}
      <FlexContainer
        className="pb-4 pr-4"
        flexContainerId="footer-actions"
        align="center"
        justify="space-between"
        gap={2}
      >
        {/* Check Eye Icon */}
        <Link
          to={`/product/${product?.id}`}
          state={{ product: product }}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <Icons.EyeIcon className="w-4 h-4 text-primary_black_500" />
        </Link>
        {/* Add To Cart */}
        <Button
          variant="primary"
          buttonId="add-to-cart"
          buttonType="button"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </FlexContainer>
    </FlexContainer>
  )
}

/**
 * @description ProductCard component
 * @param {string} title - The title of the product.
 * @param {string} description - The description of the product.
 * @param {string} imageSrc - The source URL of the product image.
 * @param {function} onAddToCart - The function to call when the "Add to Cart" button is clicked.
 * @param {IProduct} product - The product object.
 * @returns {JSX.Element}
 */
const ProductCard: React.FC<IProductCardProps> = ({
  title = 'Product',
  description = 'Product Description',
  imageSrc = 'https://via.placeholder.com/300',
  onAddToCart = () => {},
  product
}): JSX.Element => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <ProductCardImage title={title} imageSrc={imageSrc} />
      <ProductCardBody
        title={title}
        product={product}
        description={description}
      />
      <ProductCardFooter product={product} onAddToCart={onAddToCart} />
    </div>
  )
}

export default ProductCard
