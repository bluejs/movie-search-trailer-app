import { useAppDispatch } from '@/data/store';
import { fetchTrailer } from '@/data/trailerSlice';
import { MovieInstance } from '@/types';

/**
 * Custom hook to view the trailer of a movie.
 *
 * @returns {(movie: MovieInstance) => void} - The function to dispatch the fetchTrailer action.
 */
export const useViewTrailer = () => {
  const dispatch = useAppDispatch();

  /**
   * Dispatch the action to fetch the trailer for the given movie.
   *
   * @param {MovieInstance} movie - The movie instance.
   */
  const viewTrailer = (movie: MovieInstance) => {
    dispatch(fetchTrailer(movie.id));
  };

  return viewTrailer;
};

export default useViewTrailer;
