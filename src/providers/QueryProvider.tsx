import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

/**
 * @description QueryProvider wraps its children with a QueryClientProvider to provide react query functionality.
 * @param {QueryProviderProps} children - Represents the content to be rendered within the QueryClientProvider.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // --> Create a new QueryClient instance and store it in state
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
