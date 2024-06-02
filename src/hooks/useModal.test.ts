import { act, renderHook } from '@testing-library/react';

import { useModal } from './useModal';

describe('useModal', () => {
  test('should initialize with modal closed', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.props.isOpen).toBe(false);
  });

  test('should open the modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.props.isOpen).toBe(true);
  });

  test('should close the modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(result.current.props.isOpen).toBe(false);
  });

  test('should provide correct props for Modal component', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.props).toHaveProperty('isOpen');
    expect(result.current.props).toHaveProperty('onClose');
    expect(typeof result.current.props.onClose).toBe('function');
  });
});
