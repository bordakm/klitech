import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieId = null;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.movieId = x.id;
    });
  }

}
