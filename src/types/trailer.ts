export interface TrailerInstance {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export enum TrailerState {
  Idle = 'IDLE', // No trailer has been clicked or the last modal has closed
  Loading = 'LOADING', // Clicked view trailer but it's still loading
  Loaded = 'LOADED', // Loaded successfully
  Error = 'ERROR', // Failed to load
}
