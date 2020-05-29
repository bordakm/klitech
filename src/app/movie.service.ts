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
  APIkey = 'ad28e1491c1cfcc0c75e67693e7b6abd';
  /**
   * Egy megadott IDjű film részletes adatait kéri le
   * @param id A film ID-je
   */
  getMovie(id: number) {
    return this.http.get<Movie>('https://api.themoviedb.org/3/movie/' + id, {
      params: new HttpParams()
        .set('api_key', this.APIkey)
    });
  }
  /**
   * Filmeket listáz a keresési szövegtől függően.
   * Amennyiben üres a keresett szó, a legnépszerűbb filmek kerülnek listázásra.
   * Amennyiben megadunk keress szót, arra szűrt találatokat kapunk
   * A page megadásával a lekérendő lap számát adhatjuk meg
   * @param searchtext A keresett szöveg
   * @param page A megjelenítendő oldalszám
   */
  getMovies(searchtext: string = '', page: number = 1) {
    if (searchtext) {
      return this.http.get<MovieResults>('https://api.themoviedb.org/3/search/movie', {
        params: new HttpParams()
          .set('api_key', this.APIkey)
          .set('query', searchtext)
          .set('page', page.toString())
      });
    }
    else {
      return this.http.get<MovieResults>('https://api.themoviedb.org/3/movie/popular', {
        params: new HttpParams()
          .set('api_key', this.APIkey)
          .set('page', page.toString())
      });
    }
  }

  /**
   * A megadott ID-jű filmhez kér le képeket
   * @param id A film ID-je
   */
  getMovieImages(id: number) {
    return this.http.get<MovieImages>('https://api.themoviedb.org/3/movie/' + id + '/images', {
      params: new HttpParams()
        .set('api_key', this.APIkey)
    });
  }
  /**
   * A megadott IDjű filmhez tartozó szerepeket kér le
   * @param id A film ID-je
   */
  getMovieCredits(id: number) {
    return this.http.get<Credits>('https://api.themoviedb.org/3/movie/' + id + '/credits', {
      params: new HttpParams()
        .set('api_key', this.APIkey)
    });
  }
}
