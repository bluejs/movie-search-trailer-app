import '@/styles/movies.scss';
import { MovieInstance } from '@/types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from './Movie';

interface MovieListProps extends React.HTMLAttributes<HTMLDivElement> {
  movies: MovieInstance[];
  header?: string;
  emptyMessage?: string;
  emptyIcon?: string;
  clearButtonText?: string;
  clearAction?: () => void;
}

/**
 * MovieList component that displays a list of movies with optional header, empty state, and clear action.
 *
 * @param {MovieListProps} props - The props for the MovieList component.
 * @param {MovieInstance[]} props.movies - The list of movies to display.
 * @param {string} [props.header] - The header text for the movie list.
 * @param {string} [props.emptyMessage] - The message to display when the movie list is empty.
 * @param {string} [props.emptyIcon] - The icon to display when the movie list is empty.
 * @param {string} [props.clearButtonText='Clear'] - The text for the clear button.
 * @param {() => void} [props.clearAction] - The action to perform when the clear button is clicked.
 * @returns {JSX.Element} The MovieList component.
 */
export const MovieList: React.FC<MovieListProps> = ({
  movies,
  header,
  emptyMessage,
  emptyIcon,
  clearButtonText = 'Clear',
  clearAction,
  ...htmlAttributes
}) => {
  return (
    <div className="movie-list" {...htmlAttributes}>
      {header && <h6 className="header">{header}</h6>}
      {movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map(movie => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="text-center empty-cart">
          {emptyIcon && <i className={`bi ${emptyIcon}`} />}
          <p>{emptyMessage}</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
      {movies.length > 0 && clearAction && (
        <footer className="text-center">
          <button className="btn btn-primary" onClick={clearAction}>
            {clearButtonText}
          </button>
        </footer>
      )}
    </div>
  );
};
