import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieId: any;
  movie: any;
  releaseYear: any;
  
  constructor(private db: DatabaseService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.movieId = paramMap.get('id');
    });
    this.movie = await this.getMovie(this.movieId);
    this.releaseYear = this.movie.release_date.slice(0, 4);
  }

  getMovie(movieId: number) {
    return firstValueFrom(this.db.getMovieByIdTMDB(movieId));
  }
}
