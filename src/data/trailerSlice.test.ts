import { TrailerState as TrailerStateEnum } from '@/types';
import { waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import reducer, { clearTrailer, fetchTrailer } from './trailerSlice';

const middlewares = [thunk];
const mockStore = configureMockStore<{}, ThunkDispatch<{}, void, any>>(
  middlewares,
);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('trailerSlice', () => {
  const initialState = { state: TrailerStateEnum.Idle, videoKey: null };

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle clearTrailer', () => {
      const previousState = {
        state: TrailerStateEnum.Loaded,
        videoKey: '12345',
      };
      const action = clearTrailer();
      const state = reducer(previousState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('async thunks', () => {
    test('creates fetchTrailer.fulfilled when fetching trailer has been done', async () => {
      const videoKey = 'abc123';
      fetchMock.mockResponseOnce(
        JSON.stringify({
          videos: { results: [{ type: 'Trailer', key: videoKey }] },
        }),
      );

      const expectedActions = [
        { type: fetchTrailer.pending.type, meta: expect.anything() },
        {
          type: fetchTrailer.fulfilled.type,
          payload: { videoKey },
          meta: expect.anything(),
        },
      ];
      const store = mockStore({ state: TrailerStateEnum.Idle, videoKey: null });

      await store.dispatch(fetchTrailer(1 as any));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('creates fetchTrailer.rejected when fetching trailer fails', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch'));

      const expectedActions = [
        { type: fetchTrailer.pending.type, meta: expect.anything() },
        {
          type: fetchTrailer.rejected.type,
          error: expect.anything(),
          meta: expect.anything(),
        },
      ];
      const store = mockStore({ state: TrailerStateEnum.Idle, videoKey: null });

      await store.dispatch(fetchTrailer(1));
      waitFor(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
