import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // kulcsszavas keresés film/sorozat:
  // találatoknál a részletekben 5-6 fontos adat kiemelve
  // szereplők, sorozatoknál epizódok
  // színészek adatlapja
  // legnépszerűbb filmek, adott témához

  getMovies() {
    return this.http.get<Movie>('https://api.themoviedb.org/3/movie/popular', {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
        .set('page', '1')
    });
  }
}
