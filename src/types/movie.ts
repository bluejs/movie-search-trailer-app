export interface MovieInstance {
  id: number;
  overview?: string;
  release_date?: string;
  poster_path?: string;
  title: string;
}

export type MovieId = MovieInstance['id'];

export const isMovieInstance = (obj: unknown): obj is MovieInstance => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as MovieInstance).id === 'number' &&
    (typeof (obj as MovieInstance).overview === 'string' ||
      !(obj as MovieInstance).overview) &&
    (typeof (obj as MovieInstance).release_date === 'string' ||
      !(obj as MovieInstance).release_date) &&
    (typeof (obj as MovieInstance).poster_path === 'string' ||
      !(obj as MovieInstance).poster_path) &&
    typeof (obj as MovieInstance).title === 'string'
  );
};

export const isMovieInstanceArray = (
  array: unknown,
): array is MovieInstance[] => {
  return Array.isArray(array) && array.every(isMovieInstance);
};
