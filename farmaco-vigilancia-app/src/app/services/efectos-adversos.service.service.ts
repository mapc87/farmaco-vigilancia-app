import { Injectable } from '@angular/core';
import { efectosAdversos } from '../interfaces/efectos-adversos.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EfectosAdversosServiceService {

  constructor(private http: HttpClient) { }

  private url = "https://dummyjson.com/users";
  private url2 = "https://dummyjson.com/products/1";

  getEfectoAdverso(id:string){
    return this.http.get<efectosAdversos>(this.url2); 
  }

  getgetEfectosAdversos():Observable<efectosAdversos[]>{
    return this.http.get<efectosAdversos[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addgetEfectoAdverso(enfermedad: efectosAdversos):Observable<efectosAdversos>{
    return this.http.post<efectosAdversos>(this.url, enfermedad).pipe(
      catchError(this.handleError)
    )
  }

  updategetEfectoAdverso(enfermedad:efectosAdversos):Observable<efectosAdversos>{
    return this.http.put<efectosAdversos>(this.url2, enfermedad).pipe(
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
