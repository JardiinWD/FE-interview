import { FlexContainer, Input } from '@/components/atoms'
import React, { JSX } from 'react'

interface IFiltersProps {
  onSearchProduct: (value: string) => void
  // TODO: Aggiungere quelli riguardanti il Dropdown
}

const Filters: React.FC<IFiltersProps> = ({ onSearchProduct }): JSX.Element => {
  return (
    <FlexContainer
      direction="row"
      wrap="nowrap"
      justify="space-between"
      align="center"
      className="w-[85%] h-40"
    >
      <Input
        boxClassName="!w-[50%]"
        type="text"
        id="filter-products"
        onChange={onSearchProduct}
        placeholder="Red Lipstick"
        label="Search for products"
      />
    </FlexContainer>
  )
}

export default Filters
