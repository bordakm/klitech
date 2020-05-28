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

  ngOnInit(): void {
    /*this.movieService.getPopularMovies().subscribe((x: any) => {
      this.movies = x.results;
    });*/
    this.getMovies('');
  }

  getMovies(searchText: string){
    this.movieService.getMovies(searchText).subscribe((x: MovieResults) => {
      this.movies = x.results;
    });
  }

  navMovie(x){
    this.router.navigate(['movie/' + x]);
  }

  searchTextChanged(x: any){
    this.getMovies(x.target.value || '');
  }
}
