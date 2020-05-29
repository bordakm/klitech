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
  /**
   * Betölti a localStorage-ból az utoljára keresett kifejezést()
   */
  ngOnInit(): void {
    this.loadSearch();
    this.getMovies(this.searchString);
    window.addEventListener('scroll', x => {
      const t = document.documentElement;
      if (t.scrollHeight - t.clientHeight < t.scrollTop + 10) {
        this.onScroll();
      }
    });
  }

  /**
   * Elmenti a localStorage-be a keresett szót searchWord kulcs alá.
   * @param text A keress kifekezés.
   */
  saveSearch(text) {
    window.localStorage.setItem('searchWord', text);
  }

  /**
   * Betölti a localStorage-ből az utolsó keresett szót searchWord kulcs alól a searchString változóba
   */
  loadSearch() {
    this.searchString = window.localStorage.getItem('searchWord');
  }

  /**
   * Azt az eseményt kezeli, mikor a felhasználó a görgetéssel az oldal aljára ért
   */
  onScroll() {
    this.loadNextMovies();
  }

  /**
   * Betölti a következő oldal filmet, és hozzáfűzi az eddigi filmek listájához.
   */
  loadNextMovies() {
    this.page++;
    this.movieService.getMovies(this.searchString, this.page).subscribe(y => this.movies = this.movies.concat(y.results));
  }

  /**
   * Betölti a filmekhez a megadott kulcsszóra kapott találatokat
   * @param searchText A keresési kulcsszó
   */
  getMovies(searchText: string) {
    this.movieService.getMovies(searchText, 1).subscribe((x: MovieResults) => {
      this.movies = x.results;
    });
  }

  /**
   * A megadott ID-jű film oldalára navigál
   * @param id a film id-je, amelyre navigálni szeretnénk
   */
  navMovie(id: number) {
    this.router.navigate(['/movie/' + id]);
  }

  /**
   * 
   */
  searchTextChanged(text: any) {
    this.saveSearch(text);
    this.page = 1;
    this.getMovies(text || '');
  }
}
