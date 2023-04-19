import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { farmaco } from '../interfaces/farmaco.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { handleError } from '../handle-errors.class';

@Injectable({
  providedIn: 'root'
})
export class FarmacoServiceService {

  constructor(private http: HttpClient) { }

  private url = "/farmaco"

  getFarmaco(id:string){
    return this.http.get<farmaco>(this.url); 
  }

  get getFarmacos():Observable<farmaco[]>{
    return this.http.get<farmaco[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addFarmacos(farmaco: farmaco):Observable<farmaco>{
    return this.http.post<farmaco>(this.url, farmaco).pipe(
      catchError(this.handleError)
    )
  }

  updateFarmacos(farmaco:farmaco):Observable<farmaco>{
    return this.http.put<farmaco>(this.url, farmaco).pipe(
      catchError(this.handleError)
    )
  }  

  public handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {    
      console.error('An error ocurred', error.error.message);    
    } else {    
    console.error(`Backend returned code ${error.status},` + `body was: ${error.error}`);    
    }
    
    return throwError('Ha ocurrido un error; Por favor, inténtelo de nuevo más tarde');    
  }
}

