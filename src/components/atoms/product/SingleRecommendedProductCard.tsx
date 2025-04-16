import { Icons } from '@/assets/icons'
import {
  DiscountPill,
  FlexContainer,
  LazyImage,
  Spinner,
  Typography
} from '@/components/atoms'
import { ISingleRecommendedProductCardProps } from '@/types/atoms'
import { truncateLongText } from '@/utils/functions'
import { Box } from '@chakra-ui/react'
import React, { JSX } from 'react'
import { Link } from 'react-router-dom'

/**
 * @description SingleRecommendedProductCard component is used to show a single recommended product card.
 * @param {IProduct} product - The product object to display.
 */
const SingleRecommendedProductCard: React.FC<
  ISingleRecommendedProductCardProps
> = ({ product }): JSX.Element => {
  return (
    <Box
      width={['100%', '100%', '32%', '32%']}
      className="bg-primary_white_100 lg:h-[12.5rem] lg:min-h-[12.5rem] h-fit shadow-lg rounded-lg p-2 flex items-start justify-start gap-2"
    >
      {/* IMAGE */}
      <LazyImage
        placeholder={<Spinner width="2rem" height="2rem" />}
        className="rounded-t-lg h-40 object-contain self-center"
        src={product.images[0]}
        alt={product.title}
      />
      {/* INFO CONTAINER */}
      <FlexContainer
        as="div"
        flexContainerId="card-body"
        direction="column"
        justify="flex-start"
        align="flex-start"
        wrap="wrap"
        className="p-3 w-[75%] max-w-[75%]"
      >
        {/* TITLE */}
        <Typography
          weight="bold"
          textId={product.title}
          tagAs="h6"
          className="text-left"
          text={product.title}
        />
        {/* DESCRIPTION */}
        <Typography
          weight="regular"
          textId={'product-description'}
          textColor="text-primary_black_700"
          tagAs="p"
          text={truncateLongText(product.description, 70)}
          className="tracking-tight"
        />
        {/* PRICE AND CART ACTIONS */}
        <FlexContainer
          as="div"
          flexContainerId="card-price-actions"
          direction="row"
          justify="space-between"
          align="center"
          className="mt-2 w-full"
          gap={2}
        >
          {/* CART PRICE AND DISCOUNT */}
          <FlexContainer
            as="div"
            flexContainerId="card-price"
            direction="row"
            justify="space-between"
            align="center"
            gap={2}
          >
            {/* PRODUCT PRICE */}
            <Typography
              weight="bold"
              textId={`product-price-${product.price}`}
              textColor="text-primary_black_700"
              tagAs="p"
              text={`$${product.price}`}
              className="truncate tracking-tight"
            />
            {/* DISCOUNT PERCENTAGE */}
            {product?.discountPercentage && (
              <DiscountPill
                discountPercentage={product?.discountPercentage as number}
              />
            )}
          </FlexContainer>
          {/* REDIRECT */}
          <Link
            to={`/product/${product?.id}`}
            state={{ productId: product?.id }}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            <Icons.EyeIcon className="w-4 h-4 text-primary_black_500" />
          </Link>
        </FlexContainer>
      </FlexContainer>
    </Box>
  )
}

export default SingleRecommendedProductCard
