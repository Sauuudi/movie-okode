import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: 'movies',
    title: 'Movie Find',
    component: HomepageComponent,
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
  },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
