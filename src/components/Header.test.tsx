import { searchMovies } from '@/data/moviesSlice';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { Header } from './Header';

// Mocking useSearchParams from react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

const mockUseSearchParams = useSearchParams as jest.Mock;

const mockStore = configureStore([]);

describe('Header', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      starred: { starredMovies: [] },
      movies: { movies: [] },
    });

    store.dispatch = jest.fn();

    // Mocking the useSearchParams hook
    mockUseSearchParams.mockReturnValue([new URLSearchParams(''), jest.fn()]);
  });

  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.getByTestId('search-movies')).toBeInTheDocument();
  });

  test('clears search query when home link is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const searchInput = screen.getByTestId('search-movies');
    fireEvent.input(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');

    const homeLink = screen.getByTestId('home');
    fireEvent.click(homeLink);
    expect(searchInput).toHaveValue('');
  });

  test('dispatches searchMovies action and updates searchParams on input', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const searchInput = screen.getByTestId('search-movies');
    fireEvent.input(searchInput, { target: { value: 'test' } });

    waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(searchMovies('test'));
    });
  });

  test('renders starred movies count', () => {
    store = mockStore({
      starred: { starredMovies: [{ id: 1, title: 'Movie 1' }] },
      movies: { movies: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
