import { FlexContainer, ProductRating, Typography } from '@/components/atoms'
import { ISingleReviewProps } from '@/types/molecules'
import { truncateLongText, dateFormatter } from '@/utils/functions'
import React, { JSX } from 'react'

/**
 * @description SingleReview component is used to show a single review of a product.
 * @param {IProduct['reviews']} review - The review object to display.
 */
const SingleReview: React.FC<ISingleReviewProps> = ({
  review
}): JSX.Element => {
  return (
    <FlexContainer
      direction="column"
      justify="center"
      align="center"
      gap={3}
      className="relative w-full lg:h-auto h-[14rem] z-10 bg-primary_white_100 shadow-lg rounded-lg p-4"
    >
      {review.reviewerName && (
        <Typography
          textId="reviewer-name"
          weight="bold"
          className="-mb-2"
          text={review.reviewerName ?? '---'}
          tagAs="h4"
        />
      )}
      {review.reviewerEmail && (
        <Typography
          textId="reviewer-email"
          weight="regular"
          text={review.reviewerEmail ?? '---'}
          tagAs="p"
        />
      )}
      {review.rating && (
        <ProductRating rating={(review.rating as number) ?? 0} />
      )}
      {review.comment && (
        <Typography
          textId="review-comment"
          className="mt-1 text-center"
          weight="light"
          text={`"${truncateLongText(review.comment ?? '---', 50)}"`}
          tagAs="span"
        />
      )}
      {review.date && (
        <Typography
          textId="review-date"
          className="-mt-2"
          weight="regular"
          text={dateFormatter(review.date)}
          tagAs="p"
        />
      )}
    </FlexContainer>
  )
}

export default SingleReview
