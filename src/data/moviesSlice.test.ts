import { MovieInstance } from '@/types';
import fetchMock from 'jest-fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import reducer, { searchMovies } from './moviesSlice';

const middlewares = [thunk];
const mockStore = configureMockStore<{}, ThunkDispatch<{}, void, any>>(
  middlewares,
);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('moviesSlice', () => {
  describe('reducers', () => {
    const initialState = { movies: [] };

    test('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle searchMovies.fulfilled', () => {
      const movies: MovieInstance[] = [
        {
          id: 1,
          title: 'Movie 1',
          overview: '',
          release_date: '',
          poster_path: '',
        },
        {
          id: 2,
          title: 'Movie 2',
          overview: '',
          release_date: '',
          poster_path: '',
        },
      ];
      const action = { type: searchMovies.fulfilled.type, payload: movies };
      const state = reducer(initialState, action);
      expect(state.movies).toEqual(movies);
    });
  });

  describe('async thunks', () => {
    test('creates searchMovies.fulfilled when fetching movies has been done', async () => {
      const movies: MovieInstance[] = [
        {
          id: 1,
          title: 'Movie 1',
          overview: '',
          release_date: '',
          poster_path: '',
        },
        {
          id: 2,
          title: 'Movie 2',
          overview: '',
          release_date: '',
          poster_path: '',
        },
      ];
      fetchMock.mockResponseOnce(JSON.stringify({ results: movies }));

      const expectedActions = [
        { type: searchMovies.pending.type, meta: expect.anything() },
        {
          type: searchMovies.fulfilled.type,
          payload: movies,
          meta: expect.anything(),
        },
      ];
      const store = mockStore({ movies: [] });

      await store.dispatch(searchMovies('test'));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('creates searchMovies.rejected when fetching movies fails', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch'));

      const expectedActions = [
        { type: searchMovies.pending.type, meta: expect.anything() },
        {
          type: searchMovies.rejected.type,
          error: expect.anything(),
          meta: expect.anything(),
        },
      ];
      const store = mockStore({ movies: [] });

      await store.dispatch(searchMovies('test'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
