import { MovieInstance } from '@/types';

import reducer, {
  clearAllStarred,
  starMovie,
  unstarMovie,
} from './starredSlice';

describe('starredSlice', () => {
  const initialState = { starredMovies: [] as MovieInstance[] };

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

  test('should handle starMovie', () => {
    const action = starMovie(movie);
    const state = reducer(initialState, action);
    expect(state.starredMovies).toEqual([movie]);
  });

  test('should handle unstarMovie', () => {
    const starredState = { starredMovies: [movie] };
    const action = unstarMovie(movie);
    const state = reducer(starredState, action);
    expect(state.starredMovies).toEqual([]);
  });

  test('should handle clearAllStarred', () => {
    const starredState = { starredMovies: [movie] };
    const action = clearAllStarred();
    const state = reducer(starredState, action);
    expect(state.starredMovies).toEqual([]);
  });
});
