import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IAwards } from 'src/app/models/IAwards';
import { IMovies } from 'src/app/models/IMovies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.scss']
})
export class ViewMovieComponent implements OnInit {

  public id :number | null= null;
  public awards : any[]= [];
  public movie : IMovies = {} as IMovies;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: MoviesService
  ) { }

  ngOnInit(): void {
    this.getIdFromUrl()
    if(this.id){
      this.getMovieDetail(this.id)
    }
  }

  public getIdFromUrl(){
    this.activatedRoute.paramMap.subscribe({
      next: (param: ParamMap) => {
        const idFromUrl = param.get('id');
        if (idFromUrl !== null) {
          this.id = parseInt(idFromUrl, 10);
        } else {
          this.id = null; // Handle the case when 'idFromUrl' is null
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public getMovieDetail(id:number){
    this.httpClient.viewMovie(id).subscribe({
      next:(data:IMovies)=>{
        console.log(data.awards)
        this.movie = data;
        this.awards = data.awards;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
