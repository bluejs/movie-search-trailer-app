import { MovieInstance } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchLaterState {
  watchLaterMovies: MovieInstance[];
}

const initialState: WatchLaterState = {
  watchLaterMovies: [],
};

/**
 * Slice for managing watch later movies state.
 */
const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState,
  reducers: {
    /**
     * Add a movie to the watch later list.
     *
     * @param {WatchLaterState} state - The current state of watch later movies.
     * @param {PayloadAction<MovieInstance>} action - The action containing the movie to add.
     */
    addToWatchLater: (state, action: PayloadAction<MovieInstance>) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },
    /**
     * Remove a movie from the watch later list.
     *
     * @param {WatchLaterState} state - The current state of watch later movies.
     * @param {PayloadAction<MovieInstance>} action - The action containing the movie to remove.
     */
    removeFromWatchLater: (state, action: PayloadAction<MovieInstance>) => {
      const indexOfId = state.watchLaterMovies.findIndex(
        key => key.id === action.payload.id,
      );
      state.watchLaterMovies.splice(indexOfId, 1);
    },
    /**
     * Remove all movies from the watch later list.
     *
     * @param {WatchLaterState} state - The current state of watch later movies.
     */
    removeAllWatchLater: state => {
      state.watchLaterMovies = [];
    },
  },
});

export const { addToWatchLater, removeFromWatchLater, removeAllWatchLater } =
  watchLaterSlice.actions;

export default watchLaterSlice.reducer;
