import { Component, OnInit, Input } from '@angular/core';
import { Movie, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  @Input() movie: Movie;
  imageurl: string;
  ngOnInit(): void {
    this.movieService.getMovieImages(this.movie.id).subscribe(x => {
      if (x.posters.length > 0) {
        this.imageurl = 'https://image.tmdb.org/t/p/w500' + x.posters[0].file_path;
      }
      else {
        this.imageurl = 'https://via.placeholder.com/300x400';
      }
    });
  }
}
