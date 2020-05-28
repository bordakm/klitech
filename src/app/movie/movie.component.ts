import { Component, OnInit, Input } from '@angular/core';
import { MovieService, Movie } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie;
  imageurl: string;
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.movieService.getMovie(p.id).subscribe(m => {
        this.movie = m;
      });

      this.movieService.getMovieImages(p.id).subscribe(x => {
        if (x.posters.length > 0) {
          this.imageurl = 'https://image.tmdb.org/t/p/w500' + x.posters[0].file_path;
        }
        else {
          this.imageurl = 'https://via.placeholder.com/300x400';
        }
      });

    });
  }
}
