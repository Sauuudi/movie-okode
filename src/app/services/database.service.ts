import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // This should not be here, but anyway
  apikey = '70084def39f5e39da38632b89bfae368';

  constructor(private http: HttpClient) { }
  
  searchMoviesByIdTMDB(search: any) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&query=${search}`;
    return this.http.get(url);
  }

  getMovieByIdTMDB(movieId: any) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${this.apikey}`;
    return this.http.get(url)
  }
}
