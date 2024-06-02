import { useAppDispatch } from '@/data/store';
import { fetchTrailer } from '@/data/trailerSlice';
import { MovieInstance } from '@/types';
import { renderHook } from '@testing-library/react';

import { useViewTrailer } from './useViewTrailer';

jest.mock('@/data/store', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/data/trailerSlice', () => ({
  fetchTrailer: jest.fn(),
}));

describe('useViewTrailer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  test('should dispatch fetchTrailer with movie id', () => {
    const movie: MovieInstance = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      release_date: '2022-01-01',
      poster_path: '/path/to/poster',
    };

    const { result } = renderHook(() => useViewTrailer());
    result.current(movie);

    expect(dispatch).toHaveBeenCalledWith(fetchTrailer(movie.id));
  });
});
