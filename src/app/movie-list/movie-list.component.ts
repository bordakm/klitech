import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {


  constructor(private movieService: MovieService, private router: Router ) { }
  movies = [];

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((x: any) => {
      this.movies = [x.address, x.address, x.address];
    });
  }

  navMovie(x){
    this.router.navigate(['movie/' + x]);
  }
}
