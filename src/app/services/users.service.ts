import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from '../models/IUsers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private static serverUrl: string = `http://localhost:3000`;
  
  constructor(private httpClient: HttpClient) { }

  public registerUser(data:IUsers) : Observable <IUsers>{
    let dataUrl : string = `${UsersService.serverUrl}/signupUsers`;
    return this.httpClient.post<IUsers>(dataUrl, data).pipe()
  }

  public loginUser():Observable <IUsers>{
    let dataUrl : string = `${UsersService.serverUrl}/signupUsers`;
    return this.httpClient.get<IUsers>(dataUrl).pipe()
  }
}
