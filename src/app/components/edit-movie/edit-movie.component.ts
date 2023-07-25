import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IMovies } from 'src/app/models/IMovies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  editForm : FormGroup = new FormGroup({});
  public id :number | null= null;
  public movie :IMovies = {} as IMovies;

  constructor(
    private formBuilder : FormBuilder,
    private movieService : MoviesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initFormGroup()
    this.getIdFromUrl()
    if(this.id){
      this.getMovieData(this.id)
    }
  }

  initFormGroup(){
    this.editForm = this.formBuilder.group({
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

  public getIdFromUrl(){
    this.activatedRoute.paramMap.subscribe({
      next: (param: ParamMap) => {
        const idFromUrl = param.get('id');        
        console.log(idFromUrl)
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

  public getMovieData(id: number) {
    this.movieService.viewMovie(id).subscribe({
      next: (data: IMovies) => {
        console.log(data);
        this.movie = data;
  
        // Set the form values using the data fetched from the API
        this.editForm.patchValue({
          id: data.id,
          title: data.title,
          release_year: data.release_year,
          genre: data.genre,
          director: data.director,
          writers: data.writers,
          image: data.image,
          actors: data.actors,
          plot: data.plot,
          rating: data.rating,
          runtime_minutes: data.runtime_minutes,
          languages: data.languages,
          subtitles: data.subtitles,
          awards: data.awards,
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }  

  public editMovie(){
    if(this.id){
      this.movieService.editMovie(this.editForm.value, this.id).subscribe({
        next:(res)=>{
          console.log(res)
          console.log('edited')
        },error:(error)=>{
          console.log(error)
        }
      })
    }
    
    console.log(this.editForm.value)
 }
  }

  // public getMovieData(){
  //   this.movieService.viewMovie(this.id).subscribe({

  //   })
  // }




  

