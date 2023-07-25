import { Component, OnInit } from '@angular/core';
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
  public awards : IAwards[] = [];

  constructor(private movieservice: MoviesService) { }

  ngOnInit(): void {
    this.getAllMoviesFromServer()
    this.getAllAwardsFromServer()
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

}
