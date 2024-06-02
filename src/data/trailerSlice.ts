import { API_KEY, ENDPOINT } from '@/constants';
import {
  TrailerInstance,
  TrailerState as TrailerStateEnum,
  type MovieId,
} from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface TrailerState {
  state: TrailerStateEnum;
  videoKey: string | null;
}

const initialState: TrailerState = {
  state: TrailerStateEnum.Idle,
  videoKey: null,
};

/**
 * Async thunk to fetch the trailer for a movie based on its ID.
 *
 * @param {MovieId} id - The ID of the movie.
 * @returns {Promise<{ videoKey: string | null }>} The video key of the trailer.
 */
export const fetchTrailer = createAsyncThunk<
  { videoKey: string | null },
  MovieId
>('trailer/fetch', async (id: MovieId) => {
  let videoKey = null;
  const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

  try {
    const videoData = await fetch(URL).then(response => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid: TrailerInstance) => {
        return vid.type === 'Trailer';
      });
      videoKey = trailer ? trailer.key : videoData.videos.results[0].key;
    }
    return { videoKey };
  } catch {
    return { videoKey: null };
  }
});

/**
 * Slice for managing trailer state.
 */
const trailerSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    /**
     * Clear the trailer state.
     *
     * @param {TrailerState} state - The current state of the trailer.
     */
    clearTrailer(state) {
      state.state = TrailerStateEnum.Idle;
      state.videoKey = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrailer.pending, state => {
        state.state = TrailerStateEnum.Loading;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.state = TrailerStateEnum.Loaded;
        state.videoKey = action.payload.videoKey;
      })
      .addCase(fetchTrailer.rejected, state => {
        state.state = TrailerStateEnum.Error;
        state.videoKey = null;
      });
  },
});

export const { clearTrailer } = trailerSlice.actions;

export default trailerSlice.reducer;
