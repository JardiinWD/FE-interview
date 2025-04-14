// TODO : Bugfixing per il componente da fare

/* 

1. Ripristino di tutte le categorie con la voce All Categories, dopo un pò sparisce perché ne ho settata una
2. Che filtri in Filters per tutti i prodotti, non solo per i filteredProducts paginati

*/

import React, { useState } from 'react'
import { Button, FlexContainer, Typography } from '@/components/atoms'
import { For } from '@chakra-ui/react'
import { ICategoryDropdownProps } from '@/types/atoms'

// -------------- INTERFACES
interface IState {
  isDropdownOpen?: boolean
  selectedCategory?: string
}

/**
 * @description Dropdown component for selecting product categories
 * @param {IProduct['category']} categories - Array of categories to display in the dropdown
 * @param {(category: string) => void} onCategorySelect - Callback function to handle category selection
 * @returns
 */
const CategoryDropdown: React.FC<ICategoryDropdownProps> = ({
  categories,
  onCategorySelect
}) => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    isDropdownOpen: false,
    selectedCategory: 'All Categories'
  })

  console.log('CATEGORIES RECEIVED -->', categories)

  // -------------- HANDLERS

  const handleCategorySelect = (category: string) => {
    // Update the selected category in the state
    setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
      isDropdownOpen: false
    }))
    // Pass the selected category to the parent component
    onCategorySelect(category)
  }

  return (
    <FlexContainer direction="column" align="flex-start" className="relative">
      {/* Dropdown Button */}
      <Button
        variant="primary"
        buttonType="button"
        buttonId="category-dropdown-button"
        onClick={() =>
          setState((prevState) => ({
            ...prevState,
            isDropdownOpen: !prevState.isDropdownOpen
          }))
        }
        className="focus:outline-none !bg-primary_white_100 px-5 py-2.5 text-center inline-flex items-center"
      >
        <Typography
          text={state.selectedCategory as string}
          tagAs="p"
          weight="regular"
        />
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </Button>

      {/* Dropdown menu */}
      {state.isDropdownOpen && (
        <FlexContainer
          direction="column"
          wrap="nowrap"
          justify="flex-start"
          align="center"
          gap={2}
          className="absolute !h-72 !max-h-72 p-4 overflow-y-auto top-[3rem] right-0 z-10 bg-white rounded-lg shadow-sm w-56"
          style={{
            boxShadow:
              '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
          }}
        >
          <For each={categories}>
            {(category) => (
              <Button
                key={category}
                variant="secondary"
                buttonType="button"
                buttonId="category-dropdown-button"
                className="block w-full capitalize text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-center"
                onClick={() => handleCategorySelect(category)}
              >
                <Typography text={category} tagAs="span" weight="regular" />
              </Button>
            )}
          </For>
        </FlexContainer>
      )}
    </FlexContainer>
  )
}

export default CategoryDropdown
