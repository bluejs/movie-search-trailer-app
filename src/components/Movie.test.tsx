import { starMovie, unstarMovie } from '@/data/starredSlice';
import { addToWatchLater, removeFromWatchLater } from '@/data/watchLaterSlice';
import { useViewTrailer } from '@/hooks';
import { MovieInstance } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Movie } from './Movie';

// Mock useViewTrailer hook
jest.mock('@/hooks', () => ({
  useViewTrailer: jest.fn(),
}));

const mockUseViewTrailer = useViewTrailer as jest.Mock;

// Mock store
const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

const movie: MovieInstance = {
  id: 1,
  overview: 'A fantastic movie that you have never seen before.',
  release_date: '2022-01-01',
  poster_path: '/path/to/poster',
  title: 'Great Movie',
};

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Movie movie={movie} />
    </Provider>,
  );

describe('Movie', () => {
  beforeEach(() => {
    store = mockStore({
      starred: { starredMovies: [] },
      watchLater: { watchLaterMovies: [] },
    });

    store.dispatch = jest.fn();
    mockUseViewTrailer.mockReturnValue(jest.fn());
  });

  test('renders movie details', () => {
    renderComponent();

    // title and mobile title
    expect(screen.getAllByText(movie.title)).toHaveLength(2);
    expect(screen.getByText(movie.overview!)).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  test('stars a movie', () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('starred-link'));
    expect(store.dispatch).toHaveBeenCalledWith(starMovie(movie));
  });

  test('unstars a movie', () => {
    store = mockStore({
      starred: { starredMovies: [movie] },
      watchLater: { watchLaterMovies: [] },
    });
    store.dispatch = jest.fn();

    renderComponent();

    fireEvent.click(screen.getByTestId('unstar-link'));
    expect(store.dispatch).toHaveBeenCalledWith(unstarMovie(movie));
  });

  test('renders starred icon when movie is starred', () => {
    store = mockStore({
      starred: { starredMovies: [movie] },
      watchLater: { watchLaterMovies: [] },
    });

    renderComponent();

    expect(screen.getByTestId('star-fill')).toBeInTheDocument();
  });

  test('adds a movie to watch later', () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('watch-later'));
    expect(store.dispatch).toHaveBeenCalledWith(addToWatchLater(movie));
  });

  test('removes a movie from watch later', () => {
    store = mockStore({
      starred: { starredMovies: [] },
      watchLater: { watchLaterMovies: [movie] },
    });
    store.dispatch = jest.fn();

    renderComponent();

    fireEvent.click(screen.getByTestId('remove-watch-later'));
    expect(store.dispatch).toHaveBeenCalledWith(removeFromWatchLater(movie));
  });

  test('views a trailer', () => {
    const viewTrailer = jest.fn();
    mockUseViewTrailer.mockReturnValue(viewTrailer);

    renderComponent();

    fireEvent.click(screen.getByText('View Trailer'));
    expect(viewTrailer).toHaveBeenCalledWith(movie);
  });
});
