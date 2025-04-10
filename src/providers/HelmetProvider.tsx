import { HelmetProvider as ReactHelmetProvider } from 'react-helmet-async'

interface HelmetProviderProps {
  children: React.ReactNode
}

/**
 * @description HelmetProvider wraps its children with a HelmetProvider to provide helmet metadata functionality.
 * @param {HelmetProviderProps} children - Represents the content to be rendered within the HelmetProvider.
 */
export const HelmetProvider = ({ children }: HelmetProviderProps) => {
  return <ReactHelmetProvider>{children}</ReactHelmetProvider>
}
