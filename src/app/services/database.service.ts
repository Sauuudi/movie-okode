import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  
  apikey = 'api_key=70084def39f5e39da38632b89bfae368';
 
  //search movies using the movie database
    searchMoviesTMDB(s : any, page : number) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${s}&${this.apikey}&page=${page}`);
  }
  //get a movie by id using the movie database
  getMovieTMDB(movieId : any){
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?&${this.apikey}`)
  }
}
