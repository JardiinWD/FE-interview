import { AdditionalInfo, FlexContainer } from '@/components/atoms'
import { IUserAdditionalInfo } from '@/types/molecules'
import { For } from '@chakra-ui/react'
import { JSX } from 'react'

/**
 * @description UserAdditionalInfo component to display additional information about the user
 * @param {IAuthData} userData - user data to display
 * @returns
 */
const UserAdditionalInfo: React.FC<IUserAdditionalInfo> = ({
  userData
}): JSX.Element => {
  // ---------- CONSTANTS
  const mappingAdditionalInfo = [
    { label: 'Email', info: userData.email },
    { label: 'First Name', info: userData.firstName },
    { label: 'Last Name', info: userData.lastName },
    { label: 'Gender', info: userData.gender }
  ]

  return (
    <FlexContainer
      className="w-full"
      wrap="nowrap"
      flexContainerId="product-additional-info"
      direction="column"
      justify="space-between"
      align="flex-start"
      gap={3}
    >
      <For each={mappingAdditionalInfo}>
        {(item) =>
          item.info && (
            <AdditionalInfo
              key={item.label}
              label={item.label}
              info={item.info}
            />
          )
        }
      </For>
    </FlexContainer>
  )
}

export default UserAdditionalInfo
