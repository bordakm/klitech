import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, MovieResults } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private movieService: MovieService, private router: Router ) { }
  movies: Movie[] = [];
  lastSearchWord;
  page = 1;

  ngOnInit(): void {
    this.getMovies('');
  }

  getMovies(searchText: string){
    this.movieService.getMovies(searchText, 1).subscribe((x: MovieResults) => {
      this.movies = x.results;
    });
  }

  navMovie(id: number){
    this.router.navigate(['/movie/' + id]);
  }

  searchTextChanged(x: any){
    const search = x.target.value;
    if (search === this.lastSearchWord) { return; }
    this.page = 1;
    this.lastSearchWord = search;
    this.getMovies(search || '');
  }
}
