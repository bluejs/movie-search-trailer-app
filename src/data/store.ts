import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import moviesSlice from './moviesSlice';
import starredReducer from './starredSlice';
import trailerSlice from './trailerSlice';
import watchLaterSlice from './watchLaterSlice';

const rootReducer = combineReducers({
  movies: moviesSlice,
  starred: starredReducer,
  watchLater: watchLaterSlice,
  trailer: trailerSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export type RootState = ReturnType<typeof rootReducer>;

export default store;
