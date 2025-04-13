import { JSX } from 'react'
import { For } from '@chakra-ui/react'
import { IDataLoopProps } from '@/types/atoms'
import { ICart, IProduct } from '@/api/types'
import { ICartSummarySingleProductProps } from '@/types/molecules'

/**
 * @description DataLoop component is a generic component that takes an array of data and a render function to display each item in the array.
 * @param {T[]} eachData - An array of data to be looped through.
 * @param {((index: number, item: T) => React.ReactNode)} render - A function that takes an index and an item from the array and returns a JSX element to be rendered.
 * @param {ReactNode} fallback - A fallback element to be displayed when the array is empty.
 * @returns
 */
const DataLoop = <T extends IProduct | ICart | ICartSummarySingleProductProps>({
  eachData = [],
  render,
  fallback
}: IDataLoopProps<T>): JSX.Element => {
  return (
    <For each={eachData} fallback={fallback}>
      {(item, index) => render?.(index, item)}
    </For>
  )
}

export default DataLoop
