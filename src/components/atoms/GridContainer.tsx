import React, { JSX } from 'react'
import { Grid } from '@chakra-ui/react'
import { IGridContainerProps } from '@/types/atoms'

/**
 * @description Renders a grid container with customizable grid properties.
 * @param {React.ReactNode} children - The children to be rendered inside the grid.
 * @param {string} templateColumns - The CSS grid template columns property.
 * @param {string} templateRows - The CSS grid template rows property.
 * @param {string} templateAreas - The CSS grid template areas property.
 * @param {string} gap - The CSS grid gap property.
 * @param {string} rowGap - The CSS grid row gap property.
 * @param {string} columnGap - The CSS grid column gap property.
 * @param {string} className - Additional class names to be added to the grid.
 * @returns {JSX.Element} - The rendered GridContainer component.
 */
const GridContainer: React.FC<IGridContainerProps> = ({
  children,
  templateColumns = 'repeat(4, 1fr)',
  templateRows = 'repeat(4, 1fr)',
  templateAreas = '',
  gap = '1rem',
  rowGap = '1rem',
  columnGap = '1rem',
  className = ''
}): JSX.Element => {
  return (
    <Grid
      templateColumns={templateColumns}
      templateAreas={templateAreas}
      templateRows={templateRows}
      rowGap={rowGap}
      columnGap={columnGap}
      gap={gap}
      className={className}
    >
      {children}
    </Grid>
  )
}

export default GridContainer
