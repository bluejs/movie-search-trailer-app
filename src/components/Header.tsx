import { searchMovies } from '@/data/moviesSlice';
import { RootState, useAppDispatch } from '@/data/store';
import debounce from 'lodash.debounce';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  NavLink,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';

import '../styles/header.scss';

/**
 * Header component that includes navigation links and a search input, which
 * dispatches search queries to the Redux store and updates URL search parameters.
 */
export const Header: React.FC = () => {
  const { starredMovies } = useSelector((state: RootState) => state.starred);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  // Create a debounced version of the dispatch function
  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string) => {
        dispatch(searchMovies(searchQuery));
        setSearchParams(
          searchQuery ? createSearchParams({ search: searchQuery }) : undefined,
        );
      }, 300),
    [dispatch, setSearchParams],
  );

  useEffect(() => {
    debouncedSearch(query);

    // Cleanup the debounce effect on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const clearQueryHandler = () => {
    setQuery('');
  };

  const inputQueryHandler = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <header>
      <Link
        className="home-logo"
        to="/"
        data-testid="home"
        onClick={clearQueryHandler}
      >
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          className="nav-starred"
          data-testid="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink
          to="/watch-later"
          className="nav-fav"
          data-testid="nav-watch-later"
        >
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={query}
          onInput={inputQueryHandler}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};
