
import {IAwards} from './IAwards'

export interface IMovies {
  id?: number;
  title: string;
  release_year: number;
  genre: string;
  director: string;
  writers: string[];
  image: string,
  actors: string[];
  plot: string;
  rating: number;
  runtime_minutes: number;
  languages: string[];
  subtitles: string[];
  awards: Array<number | string>;
}