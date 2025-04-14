import { Images } from '@/assets/images'
import {
  Button,
  FlexContainer,
  Image,
  Modal,
  Typography
} from '@/components/atoms'
import { useAuthStore, useModalStore } from '@/store'
import { ILogoutModalProps } from '@/types/molecules'
import { JSX } from 'react'

/**
 * @description LogoutModal component to display logout confirmation modal
 * @param {string} modalId - Unique ID for the modal
 * @param {boolean} isModalOpen - Flag to control modal visibility
 */
const LogoutModal: React.FC<ILogoutModalProps> = ({
  modalId = 'logout-modal',
  isModalOpen = false
}): JSX.Element => {
  // -------------- ZUSTAND STORE
  const { closeModal } = useModalStore()

  return (
    <Modal isModalOpen={isModalOpen} modalId={modalId}>
      <FlexContainer
        className="!w-96 h-fit"
        gap={2}
        flexContainerId="user-logout-modal"
        direction="column"
        justify="flex-start"
        align="center"
      >
        {/* COMPANY LOGO */}
        <Image src={Images.Logo} alt="Logo" htmlWidth={75} htmlHeight={75} />
        {/* TITLE */}
        <Typography
          className="text-primary_black_600"
          tagAs="h3"
          weight="bold"
          text="Logout"
        />
        {/* TEXT */}
        <Typography
          className="text-primary_black_600"
          tagAs="p"
          weight="normal"
          text="Are you sure you want to logout?"
        />
        {/* BUTTON WRAPPER */}
        <FlexContainer
          className="w-full h-fit mt-4"
          gap={4}
          flexContainerId="user-logout-modal-buttons"
          direction="row"
          wrap="nowrap"
          justify="center"
          align="center"
        >
          {/* CONFIRM BUTTON */}
          <Button
            variant="primary"
            buttonId="logout-button"
            buttonType="button"
            onClick={() => {
              useAuthStore.setState({
                allUserData: null,
                token: null,
                userId: null
              })
              closeModal()
            }}
          >
            <Typography
              className="text-primary_black_600"
              tagAs="span"
              weight="bold"
              text="Confirm"
            />
          </Button>
          {/* DISMISS BUTTON */}
          <Button
            variant="secondary"
            buttonId="logout-button"
            buttonType="button"
            onClick={closeModal}
          >
            <Typography
              className="text-primary_black_600"
              tagAs="span"
              weight="bold"
              text="Dismiss"
            />
          </Button>
        </FlexContainer>
      </FlexContainer>
    </Modal>
  )
}

export default LogoutModal
