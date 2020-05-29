import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  popularity: number;
  vote_count: number;
  release_date: string;
}

export interface MovieResults {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Image {
  file_path: string;
  height: number;
  width: number;
}

export interface MovieImages {
  id: number;
  posters: Image[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  birthday: string;
  place_of_birth: string;
}

export interface Actor {
  id: number;
  name: string;
  birthday: string;
  place_of_birth: string;
  biography: string;
  popularity: number;
}

export interface Credits {
  cast: Cast[];
}

export interface ActorImages {
  profiles: Image[];
}

export interface ActorsMovies {
  cast: Movie[];
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
      return this.http.get('https://api.themoviedb.org/3/movie/popular', {
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

  getActorDetails(id: number) {
    return this.http.get<Actor>('https://api.themoviedb.org/3/person/' + id, {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
    });
  }

  getActorImages(id: number) {
    return this.http.get<ActorImages>('https://api.themoviedb.org/3/person/' + id + '/images', {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
    });
  }

  getActorMovies(id: number) {
    return this.http.get<ActorsMovies>('https://api.themoviedb.org/3/person/' + id + '/movie_credits', {
      params: new HttpParams()
        .set('api_key', 'ad28e1491c1cfcc0c75e67693e7b6abd')
    });
  }
}
