import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieId: any;
  movie: any;
  release_year: any;
  constructor(private db: DatabaseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.movieId = paramMap.get('id');
    });
    this.db.getMovieTMDB(this.movieId).subscribe((response: any) => {
      this.movie = response;
      this.release_year = this.movie.release_date.slice(0, 4);
    });
  }
}
