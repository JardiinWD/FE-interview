import {
  Button,
  FlexContainer,
  AdditionalInfo,
  DiscountPill,
  ProductRating,
  Typography,
  QuantityCounter
} from '@/components/atoms'
import { ISingleProductProps } from '@/types/organisms'
import { handleRouondedRatingValue } from '@/utils/functions'
import { For, Image } from '@chakra-ui/react'
import React, { JSX } from 'react'

/**
 * @description Single Product Component for Product Page
 * @param {IProduct} product - The product object containing product details
 * @returns
 */
const SingleProduct: React.FC<ISingleProductProps> = ({ product }) => {
  return (
    <FlexContainer
      flexContainerId="product-page"
      direction="row"
      justify="flex-start"
      align="flex-start"
      wrap="nowrap"
      className="h-fit relative z-10 bg-white shadow-lg rounded-lg p-6"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* PRODUCT IMAGE */}
      <Image
        className="rounded-lg h-[24rem] w-[24rem] bg-primary_white_200"
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
        textColor="text-primary_black_500"
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
  const counterValues = {
    // Initial Value Logic -> If minimum order quantity is greater than stock, set initial value to stock
    initialValue:
      product.minimumOrderQuantity > product.stock
        ? product.stock
        : product.minimumOrderQuantity,
    // Min Value Logic -> If minimum order quantity is greater than stock, set min value to stock
    minValue:
      product.minimumOrderQuantity > product.stock
        ? product.stock
        : product.minimumOrderQuantity,
    // Max Value Logic -> If minimum order quantity is greater than stock, set max value to stock
    maxValue:
      product.stock < product.minimumOrderQuantity
        ? product.stock
        : product.minimumOrderQuantity
  }

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
            textColor="text-primary_black_700"
            weight="bold"
            tagAs="h4"
            text={`$${product?.price}`}
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
      <FlexContainer
        flexContainerId="add-to-cart"
        align="center"
        justify="space-between"
        gap={2}
      >
        {/* Add To Cart */}
        <Button
          variant="primary"
          buttonId="add-to-cart"
          buttonType="button"
          onClick={() => {}}
        >
          Add to Cart
        </Button>
        {/* Quantity Counter */}
        <QuantityCounter
          initialValue={counterValues.initialValue}
          minValue={counterValues.minValue}
          maxValue={counterValues.maxValue}
          step={1}
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default SingleProduct
