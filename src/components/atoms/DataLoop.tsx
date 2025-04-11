import { JSX } from 'react';
import { For } from '@chakra-ui/react';
import { IDataLoopProps } from '@/types/atoms'


const DataLoop = <T extends Record<string, unknown>>({
  eachData = [],
  render,
  fallback,
}: IDataLoopProps<T>): JSX.Element => {
  console.log('eachData', eachData);
  
  return (
    <For each={eachData} fallback={fallback}>
      {(item, index) => render?.(index, item)}
    </For>
  );
};

export default DataLoop
