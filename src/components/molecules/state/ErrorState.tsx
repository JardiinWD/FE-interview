import { FlexContainer } from '@/components/atoms'
import { IErrorStateProps } from '@/types/molecules'
import React, { JSX } from 'react'
import { EmptyCard } from '@/components/molecules'

/**
 * @description ErrorState component is used to show an error message when something goes wrong.
 * @param {string} containerClassName - The class name for the container element.
 * @param {string} containerId - The id for the container element.
 * @param {string} errorMessage - The error message to display.
 * @param {string} buttonText - The text for the button.
 * @param {function} onClickHandler - The function to call when the button is clicked.
 * @param {string} errorDevMessage - The error message to display in development mode.
 * @param {string} dataTestId - The data-testid for the component.
 */
const ErrorState: React.FC<IErrorStateProps> = ({
  containerClassName = 'h-[80dvh] w-full p-4',
  containerId = 'page',
  errorMessage = 'Something went wrong',
  buttonText = 'Try Again',
  onClickHandler = () => console.log('Try Again'),
  errorDevMessage = 'This is a development error message',
  dataTestId = 'error-state'
}): JSX.Element => {
  return (
    <FlexContainer
      dataTestId={dataTestId}
      flexContainerId={`${containerId}-error-state`}
      wrap="nowrap"
      direction="column"
      justify="center"
      align="center"
      gap={2}
      className={containerClassName}
    >
      <EmptyCard
        dataTestId={`${dataTestId}-card`}
        onClickHandler={onClickHandler}
        cardError={errorDevMessage}
        cardMessage={errorMessage}
        buttonText={buttonText}
      />
    </FlexContainer>
  )
}

export default ErrorState
