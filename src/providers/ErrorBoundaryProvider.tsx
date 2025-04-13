import { Error } from '@/pages'
import { JSX } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

interface ErrorBoundaryProviderProps {
  children: React.ReactNode
  customFallback?: JSX.Element
}

/**
 * @description ErrorBoundaryProvider wraps its children with an error boundary to catch and handle errors.
 * @param {ErrorBoundaryProviderProps} children - Represents the content to be rendered within the error boundary.
 */
export const ErrorBoundaryProvider = ({
  children,
  customFallback = <Error />
}: ErrorBoundaryProviderProps) => {
  return (
    <ReactErrorBoundary fallback={customFallback} onError={logError}>
      {children}
    </ReactErrorBoundary>
  )
}

function logError(error: Error, info: React.ErrorInfo) {
  console.log(`Something Went Wrong! --> ${error.message}`)
  console.log(`For proper information about the error --> ${info}`)
}
