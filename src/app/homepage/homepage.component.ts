import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { skipWhile } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  searchText = '';
  movies!: any[];
  noResults!: boolean;

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.noResults = false;
  }

  searchMovie(movieId: string) {
    this.movies = [];
    this.noResults = true;
    this.db
      .searchMoviesByIdTMDB(movieId)
      .pipe(skipWhile((res: any) => res.total_results <= 0))
      .subscribe((response: any) => {
        this.movies = response.results;
        this.noResults = false;
      });
  }

  onMovie(id: number) {
    this.router.navigate(['/movies', id]);
  }
}
