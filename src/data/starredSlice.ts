import { MovieInstance } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StarredState {
  starredMovies: MovieInstance[];
}

const initialState: StarredState = {
  starredMovies: [],
};

/**
 * Slice for managing starred movies state.
 */
const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    /**
     * Add a movie to the starred list.
     *
     * @param {StarredState} state - The current state of starred movies.
     * @param {PayloadAction<MovieInstance>} action - The action containing the movie to star.
     */
    starMovie: (state, action: PayloadAction<MovieInstance>) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    /**
     * Remove a movie from the starred list.
     *
     * @param {StarredState} state - The current state of starred movies.
     * @param {PayloadAction<MovieInstance>} action - The action containing the movie to unstar.
     */
    unstarMovie: (state, action: PayloadAction<MovieInstance>) => {
      const indexOfId = state.starredMovies.findIndex(
        key => key.id === action.payload.id,
      );
      state.starredMovies.splice(indexOfId, 1);
    },
    /**
     * Clear all starred movies.
     *
     * @param {StarredState} state - The current state of starred movies.
     */
    clearAllStarred: state => {
      state.starredMovies = [];
    },
  },
});

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;

export default starredSlice.reducer;
