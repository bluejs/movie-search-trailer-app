import '@/styles/modal.scss';
import React from 'react';

export interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component that displays its children content when open.
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {() => void} props.onClose - Event to close the modal.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @returns {JSX.Element | null} The Modal component or null if not open.
 */
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
