import { FlexContainer } from '@/components/atoms'
import { EmptyCard } from '@/components/molecules'
import { JSX } from 'react'
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
      <FlexContainer
        flexContainerId="product-page"
        wrap="nowrap"
        direction="column"
        justify="center"
        align="center"
        gap={2}
        className="h-[80dvh] w-full"
      >
        <EmptyCard
          cardError={error as string}
          cardMessage={message as string}
          buttonText="Try Again"
        />
      </FlexContainer>
    )
  } else {
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error occurred'

    return (
      <FlexContainer
        flexContainerId="product-page"
        wrap="nowrap"
        direction="column"
        justify="center"
        align="center"
        gap={2}
        className="h-[80dvh] w-full"
      >
        <EmptyCard
          cardError={errorMessage as string}
          cardMessage={'Ops! Something went wrong'}
          buttonText="Try Again"
        />
      </FlexContainer>
    )
  }
}

export default Error
