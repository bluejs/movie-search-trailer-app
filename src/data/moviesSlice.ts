import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '@/constants';
import { MovieInstance, isMovieInstanceArray } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface MoviesState {
  movies: MovieInstance[];
}

const initialState: MoviesState = {
  movies: [],
};

/**
 * Async thunk to search for movies based on a query.
 *
 * @param {string} query - The search query.
 * @returns {Promise<MovieInstance[]>} The list of movies matching the query.
 */
export const searchMovies = createAsyncThunk<MovieInstance[], string>(
  'movies/searchMovies',
  async (query: string) => {
    const url =
      query === '' ? ENDPOINT_DISCOVER : ENDPOINT_SEARCH + '&query=' + query;

    const data = await fetch(url).then(response => response.json());

    if (!isMovieInstanceArray(data.results)) {
      console.error('Invalid data format', data.results);
      throw new Error('Invalid data format');
    }

    return data.results;
  },
);

/**
 * Movies slice of the Redux store.
 */
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export default moviesSlice.reducer;
