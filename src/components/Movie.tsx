import { starMovie, unstarMovie } from '@/data/starredSlice';
import { RootState, useAppDispatch } from '@/data/store';
import { addToWatchLater, removeFromWatchLater } from '@/data/watchLaterSlice';
import { useViewTrailer } from '@/hooks';
import { MovieInstance } from '@/types';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

const placeholder = 'https://via.placeholder.com/500x750';

export interface MovieProps {
  movie: MovieInstance;
}

/**
 * Movie component that displays a movie card with actions to star, add to watch later, and view trailer.
 *
 * @param {MovieProps} props - The props for the Movie component.
 * @param {MovieInstance} props.movie - The movie instance to display.
 * @returns {JSX.Element} The Movie component.
 */
export const Movie: React.FC<MovieProps> = ({ movie }) => {
  const starred = useSelector((state: RootState) => state.starred);
  const watchLater = useSelector((state: RootState) => state.watchLater);
  const dispatch = useAppDispatch();
  const viewTrailer = useViewTrailer();

  const [isOpened, setIsOpened] = React.useState(false);

  const openCardHandler = useCallback(() => {
    setIsOpened(true);
  }, []);

  const closeCardHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpened(false);
    },
    [],
  );

  const isStarred = starred.starredMovies
    .map(movie => movie.id)
    .includes(movie.id);

  const isWatchLater = watchLater.watchLaterMovies
    .map(movie => movie.id)
    .includes(movie.id);

  return (
    <div className="wrapper">
      <div
        className={classNames('card', { opened: isOpened })}
        onClick={openCardHandler}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!isStarred ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() => dispatch(starMovie(movie))}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!isWatchLater ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() => dispatch(addToWatchLater(movie))}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => viewTrailer(movie)}
              data-testid="view-trailer"
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={closeCardHandler}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};
