import React, { JSX } from 'react'
import { Button, FlexContainer } from '@/components/atoms'
import { For } from '@chakra-ui/react'
import { IPaginationProps } from '@/types/atoms'

/**
 * @description Pagination component that displays page numbers and allows navigation between them.
 * @param {number} totalPages - The total number of pages available.
 * @param {number} currentPage - The currently active page number.
 * @param onPageChange - Callback function to handle page changes.
 * @returns JSX.Element
 */
const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId="pagination-buttons"
      direction="row"
      justify="center"
      align="center"
      gap={2}
    >
      <For each={Array.from({ length: totalPages }, (_, i) => i + 1)}>
        {(index) => {
          // Define Page Number
          const pageNumber = index + 1
          return (
            <Button
              variant="primary"
              onClick={onPageChange}
              className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-primary_blue_500 text-white' : 'bg-primary_blue_200'}`}
            >
              {pageNumber}
            </Button>
          )
        }}
      </For>
    </FlexContainer>
  )
}

export default Pagination
