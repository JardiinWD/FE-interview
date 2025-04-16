import {
  AdditionalInfo,
  CartAction,
  DiscountPill,
  FlexContainer,
  ProductRating,
  Typography
} from '@/components/atoms'
import { useCartActions } from '@/hooks'
import { ISingleProductProps } from '@/types/organisms'
import {
  handleRouondedRatingValue,
  transformNumberToCurrency
} from '@/utils/functions'
import { For, Image } from '@chakra-ui/react'
import React, { JSX } from 'react'

/**
 * @description Single Product Component for Product Page
 * @param {IProduct} product - The product object containing product details
 */
const SingleProduct: React.FC<ISingleProductProps> = ({ product }) => {
  return (
    <FlexContainer
      flexContainerId="single-product-card"
      direction="row"
      justify="flex-start"
      align="flex-start"
      wrap="nowrap"
      className="h-fit w-full max-w-full lg:w-[70%] lg:h-[42.5rem] relative z-10 bg-primary_white_100 shadow-lg rounded-lg p-4"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* PRODUCT IMAGE */}
      <Image
        className="rounded-lg hidden lg:flex lg:h-[24rem] lg:w-[24rem] bg-primary_white_100"
        src={product.images[0]}
        alt={product.title}
        fit="contain"
      />
      {/* PRODUCT INFO */}
      <FlexContainer
        flexContainerId="product-info"
        direction="column"
        justify="flex-start"
        align="flex-start"
        gap={3.5}
        className="ml-4 mt-3"
      >
        <ProductInfo product={product} />
        {/* PRODUCT PRICE */}
        <ProductPriceAndCartActions product={product} />
        {/* OTHER INFO as a LIST (Like Return Policies, warrantyInformation) */}
        <ProductAdditionalInfo product={product} />
      </FlexContainer>
    </FlexContainer>
  )
}

// ------------------ PRODUCT INFO
const ProductInfo: React.FC<ISingleProductProps> = ({
  product
}): JSX.Element => {
  return (
    <React.Fragment>
      {/* PRODUCT TITLE */}
      <Typography
        textId={`product-title-${product.title}`}
        textColor="text-primary_black_700"
        weight="bold"
        tagAs="h4"
        text={product.title ?? '---'}
        className="tracking-tight"
      />
      {/* RATING + STARS */}
      {product?.rating && (
        <FlexContainer
          flexContainerId="product-rating"
          direction="row"
          justify="flex-start"
          align="center"
          gap={1.5}
          className="rtl:space-x-reverse"
        >
          <Typography
            textId={`product-rating-${product?.rating}`}
            weight="bold"
            tagAs="span"
            textColor="text-primary_black_700"
            text={handleRouondedRatingValue(
              product?.rating as number
            ).toString()}
            className="tracking-tight"
          />
          <ProductRating rating={product?.rating as number} />
        </FlexContainer>
      )}
      {/* PRODUCT DESCRIPTION */}
      <Typography
        textId={`product-description-${product.description}`}
        textColor="text-primary_black_500 pb-4 lg:pb-0"
        weight="regular"
        tagAs="p"
        text={product.description ?? '---'}
        className="font-normal "
      />
    </React.Fragment>
  )
}

// ------------------ PRODUCT ADDITIONAL INFO
const ProductAdditionalInfo: React.FC<ISingleProductProps> = ({
  product
}): JSX.Element => {
  // ---------- CONSTANTS
  const mappingAdditionalInfo = [
    {
      label: 'Minimum order quantity',
      info: `${product.minimumOrderQuantity}`
    },
    { label: 'Category', info: product.category },
    { label: 'Brand', info: product.brand },
    {
      label: 'Dimensions',
      info: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
    },
    { label: 'Return policy', info: product.returnPolicy },
    { label: 'Availability', info: product.availabilityStatus },
    { label: 'Stock Quantity', info: `${product.stock}` },
    { label: 'Shipping Information', info: product.shippingInformation },
    { label: 'SKU', info: product.sku }
  ]

  return (
    <FlexContainer
      className="w-full border-t-[1px] pt-2"
      wrap="nowrap"
      flexContainerId="product-additional-info"
      direction="column"
      justify="space-between"
      align="flex-start"
      gap={3}
    >
      <For each={mappingAdditionalInfo}>
        {(item) =>
          item.info && (
            <AdditionalInfo
              key={item.label}
              label={item.label}
              info={item.info}
            />
          )
        }
      </For>
    </FlexContainer>
  )
}

// ------------------ PRODUCT CART ACTION
const ProductPriceAndCartActions: React.FC<ISingleProductProps> = ({
  product
}): JSX.Element => {
  // ------------ CUSTOM HOOK
  const { state, retrieveCurrentQuantity, handleAddToCart } =
    useCartActions(product)

  return (
    <FlexContainer
      flexContainerId="product-price"
      align="center"
      justify="space-between"
      className="w-full"
      gap={2}
    >
      {/* PRICE */}
      {product?.price && (
        <FlexContainer
          flexContainerId="product-price-info"
          direction="row"
          justify="center"
          align="center"
          gap={1.5}
          className="rtl:space-x-reverse"
        >
          <Typography
            textId={`product-price-${product?.price}`}
            textColor="text-primary_black_700"
            weight="bold"
            tagAs="h4"
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
      {/* CART ACTIONS */}
      <CartAction
        counterClassName="lg:w-[50%] bg-primary_white_200"
        containerClassName="lg:w-[50%]"
        isLoading={state.isLoading}
        product={product}
        onRetrieveCurrentQuantity={retrieveCurrentQuantity}
        onAddToCart={handleAddToCart}
      />
    </FlexContainer>
  )
}

export default SingleProduct
