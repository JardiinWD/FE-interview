import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/modal'
import React, { JSX } from 'react'
import { IModalProps } from '@/types/atoms'
import { useModalStore } from '@/store'

/**
 * @description Modal component for displaying content in a dialog box.
 * @param {boolean} hasModalHeader - Boolean to show/hide the modal header
 * @param {boolean} hasModalFooter - Boolean to show/hide the modal footer
 * @param {boolean} hasModalCloseButton - Boolean to show/hide the modal close button
 * @param {boolean} hasModalOverlay - Boolean to show/hide the modal overlay
 * @param {string} modalId - Unique ID for the modal
 * @param {React.ReactNode} modalBody - Content to be displayed in the modal body
 * @param {React.ReactNode} modalHeader - Content to be displayed in the modal header
 * @param {React.ReactNode} modalFooter - Content to be displayed in the modal footer
 */
const Modal: React.FC<IModalProps> = ({
  hasModalHeader = true,
  hasModalFooter = true,
  hasModalCloseButton = true,
  hasModalOverlay = true,
  modalId = 'generic-modal',
  modalBody = <ModalContent>Modal Header</ModalContent>,
  modalHeader = <ModalFooter>Modal Header</ModalFooter>,
  modalFooter = <ModalHeader>Modal Footer</ModalHeader>
}): JSX.Element => {
  // -------------- ZUSTAND STORE
  const isProductModalOpen = useModalStore.getState().isProductModalOpen
  const productData = useModalStore.getState().productData
  const { closeProductModal } = useModalStore()

  console.log('Product Data:', productData)

  return (
    <ChakraModal
      id={modalId}
      isOpen={isProductModalOpen}
      onClose={closeProductModal}
    >
      {/* Modal Generic Overlay */}
      {hasModalOverlay && <ModalOverlay />}
      {/* Modal Content */}
      <ModalContent>
        {/* Modal Header */}
        {hasModalHeader && <ModalHeader>{modalHeader}</ModalHeader>}
        {/* Modal Close Button */}
        {hasModalCloseButton && <ModalCloseButton />}
        {/* Modal Body */}
        {modalBody && <ModalBody>{modalBody}</ModalBody>}
        {/* Modal Footer */}
        {hasModalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
