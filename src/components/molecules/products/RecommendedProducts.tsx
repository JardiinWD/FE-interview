import { ProductApi } from '@/api'
import { IProduct } from '@/api/types'
import { Icons } from '@/assets/icons'
import { Button, CartAction, FlexContainer, Typography, Image, Spinner, LazyImage, DiscountPill } from '@/components/atoms'
import { truncateLongText } from '@/utils/functions'
import { Box, For } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React, { JSX } from 'react'
import { Link } from 'react-router-dom'

// ------------------ INTERFACES
export interface IRecommendedProductsProps {
    category: string
}

export interface ISingleRecommendedProductCardProps {
    product: IProduct
}


// TODO: Andrà in Atom
const SingleRecommendedProductCard: React.FC<ISingleRecommendedProductCardProps> = ({
  product
}) : JSX.Element => {
    return (
      <Box width={['100%', '100%', '32%', '32%']} className="bg-primary_white_100 lg:h-[12.5rem] lg:min-h-[12.5rem] h-fit shadow-lg rounded-lg p-2 flex items-start justify-start gap-2">
        {/* IMAGE */}
        <LazyImage
          placeholder={<Spinner width="2rem" height="2rem" />}
          className="rounded-t-lg h-40 object-contain self-center"
          src={product.images[0]}
          alt={product.title}
        />
        {/* INFO CONTAINER */}
        <FlexContainer
          as='div'
          flexContainerId="card-body"
          direction="column"
          justify="flex-start"
          align="flex-start"
          wrap='wrap'
          className="p-3 w-[75%] max-w-[75%]"
        >
          {/* TITLE */}
          <Typography
            weight='bold'
            textId={product.title}
            tagAs="h6"
            className="text-left"
            text={product.title}
          />
          {/* DESCRIPTION */}
          <Typography
            weight='regular'
            textId={'product-description'}
            textColor="text-primary_black_700"
            tagAs="p"
            text={truncateLongText(product.description, 70)}
            className="tracking-tight"
          />
          {/* PRICE AND CART ACTIONS */}
          <FlexContainer
            as='div'
            flexContainerId="card-price-actions"
            direction="row"
            justify="space-between"
            align="center"
            className="mt-2 w-full"
            gap={2}
          >
              {/* CART PRICE AND DISCOUNT */}
              <FlexContainer
                as='div'
                flexContainerId="card-price"
                direction="row"
                justify="space-between"
                align="center"
                gap={2}
              >
                {/* PRODUCT PRICE */}
                <Typography
                  weight='bold'
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
                state={{ product: product }}
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                <Icons.EyeIcon className="w-4 h-4 text-primary_black_500" />
              </Link>
            </FlexContainer>
         </FlexContainer> 
      </Box>
        
    )
}


const RecommendedProducts: React.FC<IRecommendedProductsProps> = ({
    category
}): JSX.Element => {

  // ------------------ USE QUERY
  const {data: apiData} = useQuery({
    queryKey: ['category'],
    staleTime: 5000,
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error } = await ProductApi.getProductsByCategory(category as string)
      // Return the necessary data
      return {
        data: data,
        error: error,
        status: status
      }
    }
  })

  // -------------- ERROR HANDLING
  if (apiData?.error && apiData?.error !== null) return <></>


  return (
    <FlexContainer as="section" flexContainerId='recommended-products' direction='column' justify='flex-start' align='flex-start' gap={4} className="w-full max-w-full lg:p-4">
      {/* SECTION HEADING */}
      <Typography weight='bold' textId='recommended-products-heading' tagAs="h2" className="text-left" text='Recommended Products' />
      {/* PRODUCT LISTS */}
      <FlexContainer 
        as="section" 
        flexContainerId='products-list' 
        direction='row' 
        justify='flex-start' 
        align='flex-start' 
        gap={4} 
        className="w-full max-w-full lg:p-4" 
      >
        <For each={apiData?.data?.products ?? []} >
          {(item) =>
          item && (
            <SingleRecommendedProductCard product={item} />
          )
        }
        </For>
      </FlexContainer>
    </FlexContainer>
  )
}

export default RecommendedProducts
