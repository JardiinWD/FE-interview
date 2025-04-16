import { FlexContainer } from '@/components/atoms'
import { SingleReview } from '@/components/molecules'
import { IReviewsCarouselProps } from '@/types/organisms'
import { For } from '@chakra-ui/react'
import React, { JSX } from 'react'

/**
 * @description ReviewsCarousel component is used to show a list of reviews of a product.
 * @param {IProductReview} reviews - The reviews array to display.
 */
const ReviewsCarousel: React.FC<IReviewsCarouselProps> = ({
  reviews
}): JSX.Element => {
  return (
    <FlexContainer
      gap={5}
      direction="column"
      justify="flex-start"
      flexContainerId="reviews-carousel"
      align="center"
      wrap="nowrap"
      className="h-fit w-full max-w-full lg:w-[25%] lg:h-[42.5rem] overflow-y-auto overflow-x-hidden relative z-10 bg-primary_white_200 shadow-lg rounded-lg p-4"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Testato anche tentativo con più reviews per far scrollare il container con each={[...reviews, ...reviews]} */}
      <For each={[...reviews, ...reviews]}>
        {(item) =>
          item && <SingleReview key={`${item}-review-${Math.random()}`} review={item} />
        }
      </For>
    </FlexContainer>
  )
}

export default ReviewsCarousel
