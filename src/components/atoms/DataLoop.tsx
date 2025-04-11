import { JSX } from 'react'
import { For } from '@chakra-ui/react'
import { IDataLoopProps } from '@/types/atoms'
import { ICart, IProduct } from '@/api/types'

const DataLoop = <T extends IProduct | ICart>({
  eachData = [],
  render,
  fallback
}: IDataLoopProps<T>): JSX.Element => {
  console.log('eachData', eachData)

  return (
    <For each={eachData} fallback={fallback}>
      {(item, index) => render?.(index, item)}
    </For>
  )
}

export default DataLoop
