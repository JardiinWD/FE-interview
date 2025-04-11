import { JSX, Suspense } from 'react'
import { useRouteError } from 'react-router-dom'

interface IErrorProps {
  message?: string
  status?: number
  statusText?: string
}

/**
 * @description Error component that handles and displays error messages.
 * @param {string} message - The error message to display.
 * @param {number} status - The HTTP status code associated with the error.
 * @param {string} statusText - The HTTP status text associated with the error.
 * @returns {JSX.Element} - The rendered error message or a fallback error message.
 */
const Error: React.FC<IErrorProps> = ({
  message,
  status,
  statusText
}): JSX.Element => {
  // ---------- USE ROUTE ERROR HOOK
  const error = useRouteError()

  // ---------- PROPS
  if (message || status || statusText) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="error-page">
          <h1>{status ? status : 404}</h1>
          <p>{message ? message : 'Something Went Wrong'}</p>
          <p>{statusText ? statusText : '404'}</p>
        </div>
      </Suspense>
    )
  } else {
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error occurred'

    return <Suspense fallback={<div>Loading...</div>}>{errorMessage}</Suspense>
  }
}

export default Error
