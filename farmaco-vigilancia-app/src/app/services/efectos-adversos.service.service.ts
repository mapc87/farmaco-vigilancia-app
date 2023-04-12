import { Injectable } from '@angular/core';
import { efectosAdversos } from '../interfaces/efectos-adversos.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EfectosAdversosServiceService {

  constructor(private http: HttpClient) { }

  private url = "/efectoAdverso";

  getEfectoAdverso(id:string){
    return this.http.get<efectosAdversos>(this.url); 
  }

  getgetEfectosAdversos():Observable<efectosAdversos[]>{
    return this.http.get<efectosAdversos[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addgetEfectoAdverso(efectoAdverso: efectosAdversos):Observable<efectosAdversos>{
    return this.http.post<efectosAdversos>(this.url, efectoAdverso).pipe(
      catchError(this.handleError)
    )
  }

  updategetEfectoAdverso(efectoAdverso:efectosAdversos):Observable<efectosAdversos>{
    return this.http.put<efectosAdversos>(this.url, efectoAdverso).pipe(
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
