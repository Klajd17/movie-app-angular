import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IMovies } from '../models/IMovies';
import { IAwards } from '../models/IAwards';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private static serverUrl: string = `http://localhost:3000`;

  constructor(private httpClient: HttpClient) {}

  public getAllMovies(): Observable<IMovies[]> {
    let dataUrl : string = `${MoviesService.serverUrl}/movies`;
    return this.httpClient.get<IMovies[]>(dataUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong.');
  }

  public viewMovie(id:number): Observable<IMovies>{
    let dataUrl:string = `${MoviesService.serverUrl}/movies/${id}`;
    return this.httpClient.get<IMovies>(dataUrl).pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<IAwards[]> {
    let dataUrl : string = `${MoviesService.serverUrl}/movies`;
    return this.httpClient.get<IAwards[]>(dataUrl).pipe(catchError(this.handleError));
  }

  public createMovie(movie: IMovies): Observable<IMovies> {
    let dataUrl : string = `${MoviesService.serverUrl}/movies`;
    return this.httpClient.post<IMovies>(dataUrl,movie).pipe(catchError(this.handleError));
  }

  public editMovie(movie: IMovies, id:number):Observable<IMovies>{
    let dataUrl : string = `${MoviesService.serverUrl}/movies/${id}`;
    return this.httpClient.put<IMovies>(dataUrl,movie).pipe(catchError(this.handleError))
  }

  public deleteMovie(id:number | undefined):Observable<IMovies>{
    let dataUrl : string = `${MoviesService.serverUrl}/movies/${id}`;
    return this.httpClient.delete<IMovies>(dataUrl).pipe(catchError(this.handleError))
  }

  public getSearchMovie(term: string): Observable<IMovies[]> {
    const url = `${MoviesService.serverUrl}/movies?q=${term}`;
    return this.httpClient.get<IMovies[]>(url);
  }

}
