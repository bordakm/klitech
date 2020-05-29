import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Actor, Movie } from '../movie.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
  actor: Actor;
  imageurl: string;
  movies: Movie[];
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.movieService.getActorDetails(p.id).subscribe(a => {
        this.actor = a;
      });

      this.movieService.getActorImages(p.id).subscribe(ai => {
        if (ai.profiles.length > 0) {
          this.imageurl = 'https://image.tmdb.org/t/p/w500' + ai.profiles[0].file_path;
        }
        else {
          this.imageurl = 'https://via.placeholder.com/300x400';
        }
      });

      this.movieService.getActorMovies(p.id).subscribe(am => {
        console.log(am.cast);
        this.movies = am.cast;
      });
    });
  }

}
