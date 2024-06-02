import { MovieInstance } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { MovieList } from './MovieList';

// Mock useViewTrailer hook
jest.mock('@/hooks', () => ({
  useViewTrailer: jest.fn(),
}));

// Mock store
const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

const movies: MovieInstance[] = [
  {
    id: 1,
    overview: 'A great movie',
    release_date: '2022-01-01',
    poster_path: '/path/to/poster1',
    title: 'Great Movie 1',
  },
  {
    id: 2,
    overview: 'Another great movie',
    release_date: '2022-01-02',
    poster_path: '/path/to/poster2',
    title: 'Great Movie 2',
  },
];

const renderComponent = (props = {}) =>
  render(
    <MemoryRouter>
      <Provider store={store}>
        <MovieList movies={movies} {...props} data-testid="movie-list" />
      </Provider>
    </MemoryRouter>,
  );

describe('MovieList', () => {
  beforeEach(() => {
    store = mockStore({
      starred: { starredMovies: [] },
      watchLater: { watchLaterMovies: [] },
    });

    store.dispatch = jest.fn();
  });

  test('renders movie list with movies', () => {
    renderComponent();

    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getAllByText('Great Movie 1')).toHaveLength(2);
    expect(screen.getAllByText('Great Movie 2')).toHaveLength(2);
  });

  test('renders header when provided', () => {
    renderComponent({ header: 'My Movies' });

    expect(screen.getByText('My Movies')).toBeInTheDocument();
  });

  test('renders empty state when no movies', () => {
    renderComponent({
      movies: [],
      emptyMessage: 'No movies found',
      emptyIcon: 'bi-film',
    });

    expect(screen.getByText('No movies found')).toBeInTheDocument();
    expect(screen.getByText('Go to')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  test('renders clear button and handles clear action', () => {
    const clearAction = jest.fn();
    renderComponent({ clearAction, clearButtonText: 'Clear All' });

    const clearButton = screen.getByText('Clear All');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(clearAction).toHaveBeenCalled();
  });

  test('does not render clear button when no movies', () => {
    renderComponent({ movies: [], clearAction: jest.fn() });

    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });
});
