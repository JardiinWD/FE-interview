import { ProductApi } from '@/api'
import {
  FlexContainer,
  SingleRecommendedProductCard,
  Typography
} from '@/components/atoms'
import { IRecommendedProductsProps } from '@/types/molecules'
import { For } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React, { JSX } from 'react'

/**
 * @description RecommendedProducts component is used to show a list of recommended products based on the category.
 * @param {string} category - The category of the products to display.
 * @returns
 */
const RecommendedProducts: React.FC<IRecommendedProductsProps> = ({
  category
}): JSX.Element => {
  // ------------------ USE QUERY
  const { data: apiData } = useQuery({
    queryKey: ['category'],
    staleTime: 5000,
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error } = await ProductApi.getProductsByCategory(
        category as string
      )
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
    <FlexContainer
      as="section"
      flexContainerId="recommended-products"
      dataTestId="recommended-products"
      direction="column"
      justify="flex-start"
      align="flex-start"
      gap={4}
      className="w-full max-w-full lg:p-4"
    >
      {/* SECTION HEADING */}
      <Typography
        weight="bold"
        textId="recommended-products-heading"
        tagAs="h2"
        className="text-left"
        text="Recommended Products"
      />
      {/* PRODUCT LISTS */}
      <FlexContainer
        as="section"
        flexContainerId="recommended-products-list"
        dataTestId="recommended-products-list"
        direction="row"
        justify="flex-start"
        align="flex-start"
        gap={4}
        className="w-full max-w-full lg:p-4"
      >
        <For each={apiData?.data?.products ?? []}>
          {(item) =>
            item && (
              <SingleRecommendedProductCard
                dataTestId={`recommended-product-${item.id}`}
                key={item.id}
                product={item}
              />
            )
          }
        </For>
      </FlexContainer>
    </FlexContainer>
  )
}

export default RecommendedProducts
