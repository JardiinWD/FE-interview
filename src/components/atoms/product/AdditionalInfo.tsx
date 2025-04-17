import { FlexContainer, Typography } from '@/components/atoms'
import { IAdditionalInfoProps } from '@/types/atoms'
import React, { JSX } from 'react'

/**
 * @description AdditionalInfo component to display additional information about the product
 * @param {string} info - information to display
 * @param {string} label - label for the information
 */
const AdditionalInfo: React.FC<IAdditionalInfoProps> = ({
  info = '---',
  label = '---'
}): JSX.Element => {
  return (
    <FlexContainer
      className="w-full"
      flexContainerId={`${label}-info`}
      dataTestId="additional-info"
      direction="row"
      justify="space-between"
      align="center"
    >
      {/* CUSTOM LABEL */}
      <Typography
        textId={`label-${label}`}
        textColor="text-primary_black_500"
        dataTestId={`label-${label}`}
        weight="regular"
        tagAs="span"
        text={label}
        className="capitalize"
      />
      {/* CUSTOM VALUE */}
      <Typography
        textId={`info-${label}`}
        dataTestId={`info-${label}`}
        textColor="text-primary_black_500"
        weight="bold"
        tagAs="p"
        text={info}
        className="capitalize"
      />
    </FlexContainer>
  )
}

export default AdditionalInfo
