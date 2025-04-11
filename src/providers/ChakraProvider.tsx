import {
  ChakraProvider as ReactChakraProvider,
  defaultSystem
} from '@chakra-ui/react'
import React, { JSX } from 'react'

interface ChakraProviderProps {
  children: React.ReactNode
}

export function ChakraProvider({ children }: ChakraProviderProps): JSX.Element {
  return (
    <ReactChakraProvider value={defaultSystem}>{children}</ReactChakraProvider>
  )
}
