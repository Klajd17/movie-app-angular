import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { IAwards } from 'src/app/models/IAwards';
import { IMovies } from 'src/app/models/IMovies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {

  public movies : IMovies[] = [];
  public searchMovies : IMovies[] = [];
  public awards : IAwards[] = [];

  searchForm : FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private movieservice: MoviesService) {
    this.searchForm = this.formBuilder.group({
      term: [''] // Set an initial value for the search term
    });
  }

  ngOnInit(): void {
    this.getAllMoviesFromServer()
    this.getAllAwardsFromServer()
  }

  initSearchForm(){
    this.searchForm= this.formBuilder.group({
      term: new FormControl(null)
    }) 
  }

  public getAllMoviesFromServer(){
    this.movieservice.getAllMovies().subscribe({
      next:(data)=>{
        console.log(data)
        this.movies = data;
      }, error: (error)=>{
        console.log(error)
      }
    })
  }
  
  public getAllAwardsFromServer(){
    this.movieservice.getAllGroups().subscribe({
      next:(data)=>{
        console.log(data)
        this.awards = data;
      }, error: (error)=>{
        console.log(error)
      }
    })
  }

  public deleteMovie(id:number | undefined){
    this.movieservice.deleteMovie(id).subscribe({
      next:(data:{})=>{
        this.getAllMoviesFromServer();
        console.log('deletedd')
        console.log(data)
      }, error:(error)=>{
        console.log(error)
      }
    })
  }

  public searchMoviesByTitle(term: string) {
    this.movieservice.getSearchMovie(term).subscribe({
      next: (data: IMovies[]) => {
        this.searchMovies = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
