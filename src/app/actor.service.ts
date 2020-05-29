import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActorsMovies } from './types/actors-movies';
import { ActorImages } from './types/actor-images';
import { Actor } from './types/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

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
