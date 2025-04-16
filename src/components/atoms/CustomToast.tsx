import { Images } from '@/assets/images'
import { FlexContainer, Image, Typography } from '@/components/atoms'
import { ICustomToastProps } from '@/types/atoms'
import React, { JSX } from 'react'

/**
 * @description Custom toast component for displaying messages with an image and text.
 * @param {string} toastId - Unique identifier for the toast component.
 * @param {string} toastMessage - Message to be displayed in the toast.
 */
const CustomToast: React.FC<ICustomToastProps> = ({
  toastId = 'toastId',
  toastMessage = 'Toast Message'
}): JSX.Element => {
  return (
    <FlexContainer
      direction="row"
      wrap="nowrap"
      justify="flex-start"
      align="center"
      flexContainerId={toastId}
    >
      <Image src={Images.Logo} alt="Logo" htmlWidth={75} htmlHeight={75} />
      <Typography
        textId={toastId}
        className="text-primary_black_600"
        tagAs="p"
        weight="normal"
        text={toastMessage}
      />
    </FlexContainer>
  )
}

export default CustomToast
