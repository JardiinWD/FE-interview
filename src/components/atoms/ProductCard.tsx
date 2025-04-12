import React, { JSX } from 'react'
import { Typography, Image, Button } from '@/components/atoms'
import { IProductCardProps } from '@/types/atoms'
import { Link } from 'react-router'
import { truncateLongText } from '@/utils/functions'

/**
 * @description ProductCard component
 * @param {string} title - The title of the product.
 * @param {string} description - The description of the product.
 * @param {string} imageSrc - The source URL of the product image.
 * @param {function} onAddToCart - The function to call when the "Add to Cart" button is clicked.
 * @returns {JSX.Element}
 */
const ProductCard: React.FC<IProductCardProps> = ({
  title = 'Product',
  description = 'Product Description',
  imageSrc = 'https://via.placeholder.com/300',
  onAddToCart = () => {}
}): JSX.Element => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* PRODUCT IMAGE */}
      <Link to="#" className="flex items-center justify-center">
        <Image
          className="rounded-t-lg h-48 self-center"
          src={imageSrc}
          alt={title}
          fit="contain"
        />
      </Link>
      {/* CARD BODY */}
      <div id="card-body" className="p-5">
        <Typography
          weight="regular"
          tagAs="h5"
          text={title}
          className="mb-2 text-2xl truncate font-bold tracking-tight text-gray-900 dark:text-white"
        />
        <Typography
          weight="regular"
          tagAs="p"
          text={truncateLongText(description, 70)}
          className="mb-3 font-normal text-gray-700 dark:text-gray-400"
        />
        <Button
          variant="primary"
          buttonId="read-more"
          buttonType="button"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard

/* 
<Card.Body gap="2">
        
        <Typography
          tagAs="h3"
          text={title}
          textColor="text-primary_blue_400"
          weight="bold"
          className="text-left"
        />
        
        <Typography
          tagAs="p"
          text={description}
          textColor="text-primary_blue_400"
          weight="regular"
          className="text-left"
        />
        
        <Card.Footer gap="2" margin={0} padding={0}>
          <Button
            buttonId="product-info"
            buttonType="button"
            onClick={onViewDetails}
            variant="secondary"
          >
            Other Info
          </Button>
          <Button
            buttonId="add-to-cart"
            buttonType="button"
            onClick={onAddToCart}
            variant="primary"
          >
            Add to cart
          </Button>
        </Card.Footer>
      </Card.Body>

*/
