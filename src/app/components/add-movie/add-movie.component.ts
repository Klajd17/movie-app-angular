import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IMovies } from 'src/app/models/IMovies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  movieForm : FormGroup = new FormGroup({});
  newMovie : IMovies = {} as IMovies;

  constructor(
    private movieService: MoviesService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }
 
  initFormGroup(){
    this.movieForm = this.formBuilder.group({
      id: new FormControl(null),
      title: new FormControl(null),
      release_year: new FormControl(null),
      genre: new FormControl(null),
      director: new FormControl(null),
      writers: new FormControl(null),
      image: new FormControl(null),
      actors: new FormControl(null),
      plot: new FormControl(null),
      rating: new FormControl(null),
      runtime_minutes: new FormControl(null),
      languages: new FormControl(null),
      subtitles: new FormControl(null),
      awards: new FormControl(null),
    })
  }

  addMovie(){
    if(this.movieForm.valid){
      console.log(this.movieForm.value)
      this.newMovie = this.movieForm.value;

      this.movieService.createMovie(this.newMovie).subscribe({
        next:(data:IMovies)=>{
          console.log(data)
        }, error:(error)=>{
          console.log(error)
        }
      })
    }
  }

}
