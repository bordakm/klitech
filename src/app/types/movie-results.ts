import { Movie } from './movie';
export interface MovieResults {
    results: Movie[];
    total_pages: number;
    total_results: number;
  }