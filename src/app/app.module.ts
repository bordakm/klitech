import {MatButtonModule} from '@angular/material/button'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MovieComponent } from './movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component'; // CLI imports router

const routes: Routes = [
  { path: 'movie/:id', component: MovieComponent },
  { path: '**', component: MovieListComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
