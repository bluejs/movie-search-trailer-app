import { RootState, useAppDispatch } from '@/data/store';
import React from 'react';
import { useSelector } from 'react-redux';

import { MovieList } from '@/components/MovieList';

import { clearAllStarred } from '../data/starredSlice';

export const Starred: React.FC = () => {
  const starredMovies = useSelector(
    (state: RootState) => state.starred.starredMovies,
  );
  const dispatch = useAppDispatch();

  return (
    <MovieList
      movies={starredMovies}
      header="Starred movies"
      emptyMessage="There are no starred movies."
      emptyIcon="bi-star"
      clearButtonText="Remove all starred"
      clearAction={() => dispatch(clearAllStarred())}
      data-testid="starred-movies"
    />
  );
};
