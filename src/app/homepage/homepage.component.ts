import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { DatabaseService } from '../services/db.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  searchText: string = '';
  noResults: boolean = false;
  showResults: boolean = false;
  movies: any[] = [];
  totalPages: number = 0;

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.noResults = false;
    this.showResults = false;
  }

  //this will search all the movies we want and sort them by popularity
  search() {
    this.movies = [];
    const firstSearch = this.db
      .searchMoviesTMDB(this.searchText, 1)
      .subscribe((response: any) => {
        if (response.total_results == 0) {
          console.log('no results found');
          this.noResults = true;
        } else {
          console.log('found ', response.total_results, ' movies');
          this.noResults = false;
          this.totalPages = response.total_pages;
          firstSearch.unsubscribe();
          this.getAllSearch();
          console.log(this.movies);
        }
      });
  }
  getAllSearch() {
    for (let i = 1; i <= this.totalPages; i++) {
      const loopSearch = this.db
        .searchMoviesTMDB(this.searchText, i)
        .subscribe((response: any) => {
          response.results.forEach((movie: any) => {
            this.movies.push(movie);
          });
          this.movies.sort((m1, m2) => m2.popularity - m1.popularity);
          loopSearch.unsubscribe();
        });
    }

    this.showResults = true;
  }
}
