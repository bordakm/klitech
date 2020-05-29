import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from './types/movie';
import { MovieResults } from './types/movie-results';
import { MovieImages } from './types/movie-images';
import { Credits } from './types/credits';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
        .set('page', '1')
    });
  }

  getMovie(id: number) {
    return this.http.get<Movie>('https://api.themoviedb.org/3/movie/' + id, {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
    });
  }

  getMovies(searchtext: string = '', page: number = 1) {
    if (searchtext) {
      return this.http.get<MovieResults>('https://api.themoviedb.org/3/search/movie', {
        params: new HttpParams()
          .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
          .set('query', searchtext)
          .set('page', page.toString())
      });
    }
    else {
      return this.http.get<MovieResults>('https://api.themoviedb.org/3/movie/popular', {
        params: new HttpParams()
          .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
          .set('page', page.toString())
      });
    }
  }

  getMovieImages(id: number) {
    return this.http.get<MovieImages>('https://api.themoviedb.org/3/movie/' + id + '/images', {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
    });
  }

  getMovieCredits(id: number) {
    return this.http.get<Credits>('https://api.themoviedb.org/3/movie/' + id + '/credits', {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
    });
  }
}
