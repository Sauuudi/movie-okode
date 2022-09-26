import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  searchText = '';
  movies!: any[];
  noResults!: boolean;
  showResults!: boolean;
  private totalPages = 0;

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.noResults = false;
    this.showResults = false;
  }

  /*THIS WILL RETURN US THE NUMBER OF PAGES THAT CONTAINS 
  THE MOVIES WE ARE LOOKING FOR AND CALL NEXT FUNCTION TO GET AND GROUP THEM*/
  search() {
    this.movies = [];
    const firstSearch = this.db
      .searchMoviesTMDB(this.searchText, 1)
      .subscribe((response: any) => {
        if (response.total_results == 0) {
          console.log('no results found');
          this.noResults = true;
        } else {
          console.log(
            'found ',
            response.total_results,
            ' movies in ',
            response.total_pages,
            'pages '
          );
          this.noResults = false;
          this.totalPages = response.total_pages;
          this.getAllSearch();
          console.log(this.movies);
        }
        firstSearch.unsubscribe();
      });
  }

  //THIS WILL GROUP ALL THE MOVIES FROM ALL PAGES AND SORT THEM BY POPULARITY
  getAllSearch() {
    for (let i = 1; i <= this.totalPages; i++) {
      const loopSearch = this.db
        .searchMoviesTMDB(this.searchText, i)
        .subscribe((response: any) => {
          response.results.forEach((movie: any) => {
            this.movies.push(movie);
          });
          this.movies.sort((m1, m2) => m2.popularity - m1.popularity);
          this.showResults = true;
          loopSearch.unsubscribe();
        });
    }
  }
}
