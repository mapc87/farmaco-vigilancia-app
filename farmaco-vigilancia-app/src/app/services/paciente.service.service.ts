import { Injectable } from '@angular/core';
import { paciente } from '../interfaces/paciente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteServiceService {

  constructor(private http: HttpClient) { }

  private url = "https://dummyjson.com/users";
  private url2 = "https://dummyjson.com/products/1";

  getPaciente(id:string){
    return this.http.get<paciente>(this.url2); 
  }

  getPacientes():Observable<paciente[]>{
    return this.http.get<paciente[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addPaciente(enfermedad: paciente):Observable<paciente>{
    return this.http.post<paciente>(this.url, enfermedad).pipe(
      catchError(this.handleError)
    )
  }

  updatePaciente(enfermedad:paciente):Observable<paciente>{
    return this.http.put<paciente>(this.url2, enfermedad).pipe(
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
