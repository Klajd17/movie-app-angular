import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMovieComponent } from './components/list-movie/list-movie.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ViewMovieComponent } from './components/view-movie/view-movie.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent },
  {path:'sign-up', component: SignUpComponent },
  {path:'movies/admin', component: ListMovieComponent },
  {path:'movies/add', component: AddMovieComponent },
  {path:'movies/edit/:id', component: EditMovieComponent },
  {path:'movies/view/:id', component: ViewMovieComponent },
  {path:'**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
