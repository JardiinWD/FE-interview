// TODO : Bugfixing per il componente da fare

/* 

1. Ripristino di tutte le categorie con la voce All Categories, dopo un pò sparisce perché ne ho settata una
2. Che filtri in Filters per tutti i prodotti, non solo per i filteredProducts paginati

*/

import React, { useState } from 'react'
import { Button, FlexContainer, Typography } from '@/components/atoms'
import { For } from '@chakra-ui/react'
import { ICategoriesDropdownProps } from '@/types/atoms'

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
const CategoriesDropdown: React.FC<ICategoriesDropdownProps> = ({
  categories,
  onCategorySelect
}) => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    isDropdownOpen: false,
    selectedCategory: 'All Categories'
  })

  // -------------- HANDLERS

  /**
   * @description Handle category selection
   * @param {string} category - The selected category
   */
  const handleCategorySelect = (category: string) => {
    // Update the selected category in the state
    setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
      isDropdownOpen: false
    }))
    // Pass the selected category to the parent component
    onCategorySelect(['All Categories'].includes(category) ? '' : category)
  }

  return (
    <FlexContainer
      direction="column"
      align="flex-start"
      className="relative z-20 w-64"
    >
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
        className="focus:outline-none w-full !bg-primary_white_100 px-5 py-2.5 text-center inline-flex items-center justify-between"
      >
        <Typography
          textId={`category-dropdown-${state.selectedCategory}`}
          text={state.selectedCategory as string}
          tagAs="span"
          weight="regular"
          className="capitalize"
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
          className="absolute !h-72 !max-h-72 p-4 overflow-y-auto top-[3rem] right-0 z-10 bg-white rounded-lg shadow-sm w-64"
          style={{
            boxShadow:
              '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* ALL CATEGORIES DEFAULT OPTION */}
          <Button
            variant="tertiary"
            buttonType="button"
            buttonId="category-dropdown-all-categories"
            className="block w-full capitalize text-center"
            onClick={() => handleCategorySelect('All Categories')}
          >
            <Typography
              textColor={`all-categories-label`}
              text="All Categories"
              tagAs="span"
              weight="regular"
            />
          </Button>
          <For each={categories}>
            {(category) => (
              <Button
                key={category}
                variant="tertiary"
                buttonType="button"
                buttonId="category-dropdown-button"
                className="block w-full capitalize text-center"
                onClick={() => handleCategorySelect(category)}
              >
                <Typography
                  textId={`dropdown-category-${category}`}
                  text={category}
                  tagAs="span"
                  weight="regular"
                />
              </Button>
            )}
          </For>
        </FlexContainer>
      )}
    </FlexContainer>
  )
}

export default CategoriesDropdown
