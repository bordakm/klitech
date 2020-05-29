import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../types/movie';
import { Cast } from '../types/cast';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie;
  imageurl: string;
  cast: Cast[];
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
  /**
   * Kiolvassa az URL-ből a film ID-jét, majd ez alapján lekéri a film részleteit, a filmhez tartozó képeket,
   * amiket ha nem talál, egy placeholder képpel helyettesít. Ezen kívül betölti a filmben résztvevő
   * összes színész listáját.
   */
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.movieService.getMovie(p.id).subscribe(m => {
        this.movie = m;
      });

      this.movieService.getMovieImages(p.id).subscribe(mi => {
        if (mi.posters.length > 0) {
          this.imageurl = 'https://image.tmdb.org/t/p/w500' + mi.posters[0].file_path;
        }
        else {
          this.imageurl = 'https://via.placeholder.com/300x400';
        }
      });

      this.movieService.getMovieCredits(p.id).subscribe(c => {
        this.cast = c.cast;
      });
    });
  }
}
