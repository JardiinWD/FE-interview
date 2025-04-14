import { FlexContainer, Spinner } from '@/components/atoms'
import { ILoadingStateProps } from '@/types/molecules'
import React, { JSX } from 'react'

/**
 * @description LoadingState component is used to show a loading spinner while the data is being fetched.
 * @param {string} containerClassName - The class name for the container element.
 * @param {string} containerId - The id for the container element.
 */
const LoadingState: React.FC<ILoadingStateProps> = ({
  containerClassName = 'h-[80dvh] w-full',
  containerId = 'page'
}): JSX.Element => {
  return (
    <FlexContainer
      flexContainerId={`${containerId}-loading-state`}
      wrap="nowrap"
      direction="column"
      justify="center"
      align="center"
      gap={2}
      className={containerClassName}
    >
      <Spinner />
    </FlexContainer>
  )
}

export default LoadingState
