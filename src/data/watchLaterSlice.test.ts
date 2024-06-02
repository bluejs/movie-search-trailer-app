import { MovieInstance } from '@/types';

import reducer, {
  addToWatchLater,
  removeAllWatchLater,
  removeFromWatchLater,
} from './watchLaterSlice';

describe('watchLaterSlice', () => {
  const initialState = { watchLaterMovies: [] as MovieInstance[] };

  const movie: MovieInstance = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    release_date: '2022-01-01',
    poster_path: '/path/to/poster',
  };

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addToWatchLater', () => {
    const action = addToWatchLater(movie);
    const state = reducer(initialState, action);
    expect(state.watchLaterMovies).toEqual([movie]);
  });

  test('should handle removeFromWatchLater', () => {
    const watchLaterState = { watchLaterMovies: [movie] };
    const action = removeFromWatchLater(movie);
    const state = reducer(watchLaterState, action);
    expect(state.watchLaterMovies).toEqual([]);
  });

  test('should handle removeAllWatchLater', () => {
    const watchLaterState = { watchLaterMovies: [movie] };
    const action = removeAllWatchLater();
    const state = reducer(watchLaterState, action);
    expect(state.watchLaterMovies).toEqual([]);
  });
});
