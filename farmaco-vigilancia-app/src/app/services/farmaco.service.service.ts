import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { farmaco } from '../interfaces/farmaco.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmacoServiceService {

  constructor(private http: HttpClient) { }

  private url = "https://dummyjson.com/users";
  private url2 = "https://dummyjson.com/products/1";

  getFarmaco(id:string){
    return this.http.get<farmaco>(this.url2); 
  }

  getFarmacos():Observable<farmaco[]>{
    return this.http.get<farmaco[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addFarmacos(enfermedad: farmaco):Observable<farmaco>{
    return this.http.post<farmaco>(this.url, enfermedad).pipe(
      catchError(this.handleError)
    )
  }

  updateFarmacos(enfermedad:farmaco):Observable<farmaco>{
    return this.http.put<farmaco>(this.url2, enfermedad).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {    
      console.error('An error ocurred', error.error.message);    
    } else {    
    console.error(`Backend returned code ${error.status},` + `body was: ${error.error}`);    
    }
    
    return throwError('Ha ocurrido un error; Por favor, inténtelo de nuevo más tarde');    
  }
}

