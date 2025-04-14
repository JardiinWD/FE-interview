import React, { JSX } from 'react'
import { IModalProps } from '@/types/atoms'
import { useModalStore } from '@/store'
import ReactModal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

ReactModal.setAppElement('#root')

/**
 * @description Modal component for displaying content in a dialog box.
 * @param {string} modalId - Unique ID for the modal
 */
const Modal: React.FC<IModalProps> = ({
  modalId = 'generic-modal',
  children,
  className,
  isModalOpen = false
}): JSX.Element => {
  // -------------- ZUSTAND STORE
  const { closeModal } = useModalStore()

  return (
    <ReactModal
      className={className}
      contentLabel={modalId}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
