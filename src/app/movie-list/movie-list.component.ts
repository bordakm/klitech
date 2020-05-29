import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, MovieResults } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private movieService: MovieService, private router: Router) { }
  movies: Movie[] = [];
  page = 1;
  searchString: string;

  ngOnInit(): void {
    this.getMovies('');
    window.addEventListener('scroll', x => {
      const t = document.documentElement;
      if (t.scrollHeight - t.clientHeight < t.scrollTop + 10) {
        this.onScroll();
      }
    });
  }

  onScroll() {
    this.addNextBatch();
  }

  addNextBatch() {
    this.movieService.getMovies(this.searchString, this.page).subscribe(y => this.movies = this.movies.concat(y.results));
    this.page++;
  }

  getMovies(searchText: string) {
    this.movieService.getMovies(searchText, 1).subscribe((x: MovieResults) => {
      this.movies = x.results;
    });
  }

  navMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }

  searchTextChanged(x: any) {
    this.page = 1;
    this.getMovies(x || '');
  }
}
