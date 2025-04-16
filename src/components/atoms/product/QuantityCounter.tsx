import { IQuantityCounterProps } from '@/types/atoms'
import React, { JSX, useEffect, useState } from 'react'
import { Button, FlexContainer } from '@/components/atoms'

// ---------- USE EFFECTS
interface IState {
  value: number
}

/**
 * @description QuantityCounter component (for cart actions)
 * @param {number} minValue - The minimum value for the quantity counter
 * @param {number} maxValue - The maximum value for the quantity counter
 * @param {number} step - The step value for incrementing/decrementing the quantity
 * @param {number} initialValue - The initial value for the quantity counter
 * @param {function} onIncrement - Callback function for incrementing the quantity
 * @param {function} onDecrement - Callback function for decrementing the quantity
 * @param {function} onChange - Callback function for handling input change
 * @param {function} onRetrieveCurrentQuantity - Callback function for retrieving the current quantity
 * @param {string} counterClassName - Additional class name for the counter
 */
const QuantityCounter: React.FC<IQuantityCounterProps> = ({
  minValue = 0,
  maxValue = 10,
  step = 1,
  initialValue = 0,
  onIncrement,
  onDecrement,
  onChange,
  onRetrieveCurrentQuantity,
  counterClassName = 'lg:max-w-[8rem] lg:w-[8rem]'
}): JSX.Element => {
  // ---------- STATE
  const [state, setState] = useState<IState>({
    value: initialValue
  })

  // ---------- USE EFFECTS
  useEffect(() => {
    setState({ value: initialValue })
  }, [initialValue])

  // ---------- METHODS

  // --> Decrement the quantity value by step
  const handleDecrement = () => {
    // 1. Calculate the new value by subtracting the step from the current value
    const newValue = Math.max(state.value - step, minValue)
    // 2. Update the state with the new value
    setState((prevState) => ({ ...prevState, value: newValue }))
    // 3. Call the onDecrement function and lift the state up
    onDecrement?.(newValue)
    // 4. Call the onChange function
    onChange?.(newValue)
    // 5. Call the onRetrieveCurrentQuantity function
    onRetrieveCurrentQuantity?.(newValue)
  }

  const handleIncrement = () => {
    // 1. Calculate the new value by subtracting the step from the current value
    const newValue = Math.min(state.value + step, maxValue)
    // 2. Update the state with the new value
    setState((prevState) => ({ ...prevState, value: newValue }))
    // 3. Call the onIncrement function and lift the state up
    onIncrement?.(newValue)
    // 4. Call the onChange function
    onChange?.(newValue)
    // 5. Call the onRetrieveCurrentQuantity function
    onRetrieveCurrentQuantity?.(newValue)
  }

  /**
   * @description Handle input change event and update the state
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Get the input value and parse it to an integer
    const inputValue = parseInt(e.target.value, 10)
    // 2. Check if the input value is a number and within the range of minValue and maxValue
    if (
      !isNaN(inputValue) &&
      inputValue >= minValue &&
      inputValue <= maxValue
    ) {
      // 3. Update the state with the new value
      setState((prevState) => ({ ...prevState, value: inputValue }))
      // 4. Call the onChange function
      onChange?.(inputValue)
      // 5. Call the onRetrieveCurrentQuantity function
      onRetrieveCurrentQuantity?.(inputValue)
    }
  }

  return (
    <FlexContainer gap={0} flexContainerId='quantity-counter' direction='row' wrap="nowrap" align='center' justify='center' className={`relative bg-primary_white_200 rounded-lg ${counterClassName} w-full`}>
      {/* Decrement Button */}
      <Button
        buttonType="button"
        variant="secondary"
        buttonId="decrement-button"
        onClick={handleDecrement}
        className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-3 h-3 text-gray-900 dark:text-primary_black_700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </Button>

      {/* Input Field */}
      <input
        type="text"
        id="quantity-input"
        value={state.value}
        onChange={handleInputChange}
        className="bg-primary_white_200 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm  block w-full py-2.5"
        placeholder="999"
        required
      />

      {/* Increment Button */}
      <Button
        buttonType="button"
        variant="secondary"
        buttonId="decrement-button"
        onClick={handleIncrement}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-3 h-3 text-gray-900 dark:text-primary_black_700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </Button>
    </FlexContainer>
  )
}

export default QuantityCounter
