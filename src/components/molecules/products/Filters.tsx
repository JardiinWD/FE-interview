import { FlexContainer, Input, CategoryDropdown } from '@/components/atoms'
import { IFiltersProps } from '@/types/molecules'
import React, { JSX } from 'react'

/**
 * @description Filters component that allows users to search for products and select a category.
 * @param {function} onSearchProduct - Callback function to handle product search
 * @param {function} onCategorySelect - Callback function to handle category selection
 * @param {IProduct['category'][]} categories - Array of categories to display in the dropdown
 * @returns
 */
const Filters: React.FC<IFiltersProps> = ({
  onSearchProduct,
  onCategorySelect,
  categories
}): JSX.Element => {
  return (
    <FlexContainer
      direction="row"
      wrap="nowrap"
      justify="space-between"
      align="center"
      className="w-[85.5%] h-40 mb-3"
      flexContainerId="filters"
    >
      <Input
        boxClassName="!w-[30%]"
        type="text"
        id="filter-products"
        onChange={onSearchProduct}
        placeholder="Red Lipstick"
        label="Search for products"
      />
      <CategoryDropdown
        categories={categories}
        onCategorySelect={onCategorySelect || (() => {})}
      />
    </FlexContainer>
  )
}

export default Filters
