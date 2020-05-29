import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../actor.service';
import { Actor } from '../types/actor';
import { Movie } from '../types/movie';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private actorService: ActorService) { }
  actor: Actor;
  imageurl: string;
  movies: Movie[];
  /**
   *  Kiolvassa az URL-ből a színész ID-jét, majd betölti a színészhez tartozó részletes adatokat,
   *  képeket, valamint az adott színészhez tartozó filmeket. Amennyiben nem szerepel kép a színészről,
   *  ez egy placeholder képpel kerül helyettesítésre.
   */
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.actorService.getActorDetails(p.id).subscribe(a => {
        this.actor = a;
      });

      this.actorService.getActorImages(p.id).subscribe(ai => {
        if (ai.profiles.length > 0) {
          this.imageurl = 'https://image.tmdb.org/t/p/w500' + ai.profiles[0].file_path;
        }
        else {
          this.imageurl = 'https://via.placeholder.com/300x400';
        }
      });

      this.actorService.getActorMovies(p.id).subscribe(am => {
        console.log(am.cast);
        this.movies = am.cast;
      });
    });
  }

}
