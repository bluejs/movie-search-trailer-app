import { useState } from 'react';

import { ModalProps } from '@/components/Modal';

/**
 * Custom hook for managing modal state.
 *
 * @returns {{
 *   openModal: () => void,
 *   closeModal: () => void,
 *   props: ModalProps
 * }} - The modal control functions and props.
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Open the modal.
   */
  const openModal = () => setIsOpen(true);

  /**
   * Close the modal.
   */
  const closeModal = () => setIsOpen(false);

  const props: ModalProps = {
    isOpen,
    onClose: closeModal,
  };

  return { openModal, closeModal, props };
};
