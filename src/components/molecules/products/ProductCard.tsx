import React, { JSX } from 'react'
import { Card } from '@chakra-ui/react'
import { Typography, Image, Button } from '@/components/atoms'
import { IProductCardProps } from '@/types/atoms'

/* 
title?: IProduct['title']
  description?: IProduct['description']
  imageSrc?: IProduct['images'][0]
  price?: IProduct['price']
  rating?: IProduct['rating']
  onAddToCart?: () => void
  onViewDetails?: () => void

*/

const ProductCard: React.FC<IProductCardProps> = ({
  title = 'Product',
  description = 'Product Description',
  imageSrc = 'https://via.placeholder.com/300',
  onAddToCart = () => {},
  onViewDetails = () => {}
}): JSX.Element => {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      {/* PRODUCT IMAGE */}
      <Image src={imageSrc} alt={description} fit="cover" />
      {/* CARD BODY */}
      <Card.Body gap="2">
        {/* TITLE */}
        <Typography
          tagAs="h3"
          text={title}
          textColor="text-primary_blue_400"
          weight="bold"
          className="text-left"
        />
        {/* DESCRIPTION */}
        <Typography
          tagAs="p"
          text={description}
          textColor="text-primary_blue_400"
          weight="regular"
          className="text-left"
        />
        {/* CARD BUTTONS */}
        <Card.Footer gap="2" margin={0} padding={0}>
          <Button buttonId='product-info' buttonType='button' onClick={onViewDetails} variant="secondary">
            Other Info
          </Button>
          <Button buttonId='add-to-cart' buttonType='button' onClick={onAddToCart} variant="primary">
            Add to cart
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card.Root>
  )
}

export default ProductCard
