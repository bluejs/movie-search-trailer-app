import { RootState, useAppDispatch } from '@/data/store';
import React from 'react';
import { useSelector } from 'react-redux';

import { MovieList } from '@/components/MovieList';

import { removeAllWatchLater } from '../data/watchLaterSlice';

export const WatchLater: React.FC = () => {
  const watchLaterMovies = useSelector(
    (state: RootState) => state.watchLater.watchLaterMovies,
  );
  const dispatch = useAppDispatch();

  return (
    <MovieList
      movies={watchLaterMovies}
      header="Watch Later List"
      emptyMessage="You have no movies saved to watch later."
      emptyIcon="bi-heart"
      clearButtonText="Empty list"
      clearAction={() => dispatch(removeAllWatchLater())}
      data-testid="watch-later-movies"
    />
  );
};
