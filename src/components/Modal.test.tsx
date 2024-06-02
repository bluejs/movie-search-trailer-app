import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Modal, ModalProps } from './Modal';

/**
 * Helper function to render the Modal component.
 *
 * @param {Partial<ModalProps>} props - Partial props to pass to the Modal component.
 */
const renderModal = (props: Partial<ModalProps> = {}) => {
  const defaultProps: ModalProps = {
    isOpen: false,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };
  return render(<Modal {...defaultProps} {...props} />);
};

describe('Modal', () => {
  test('renders modal content when open', () => {
    renderModal({ isOpen: true });
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render modal content when closed', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls onClose when clicking on the overlay', () => {
    const onClose = jest.fn();
    renderModal({ isOpen: true, onClose });

    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking on the close button', () => {
    const onClose = jest.fn();
    renderModal({ isOpen: true, onClose });

    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });

  test('does not call onClose when clicking inside the modal content', () => {
    const onClose = jest.fn();
    renderModal({ isOpen: true, onClose });

    fireEvent.click(screen.getByText('Modal Content'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
