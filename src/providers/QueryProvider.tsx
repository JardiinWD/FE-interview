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
  // --> Create a new QueryClient instance with default options
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
