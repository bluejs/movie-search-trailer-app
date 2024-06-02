import { RootState } from '@/data/store';
import React from 'react';
import { useSelector } from 'react-redux';

import { MovieList } from '@/components/MovieList';

export const Movies: React.FC = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);

  return (
    <MovieList
      movies={movies}
      emptyMessage="No movies found."
      data-testid="movies"
    />
  );
};
