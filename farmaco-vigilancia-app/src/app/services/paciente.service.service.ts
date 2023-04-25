import { Injectable } from '@angular/core';
import { paciente } from '../interfaces/paciente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { handleError } from '../handle-errors.class';
import { urlBackend } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class PacienteServiceService {

  constructor(private http: HttpClient) { }

  private url = `${urlBackend}/pacientes`;

  getPaciente(id:string){
    return this.http.get<paciente>(this.url); 
  }

  get getPacientes():Observable<paciente[]>{
    return this.http.get<paciente[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addPaciente(paciente: paciente):Observable<paciente>{
    return this.http.post<paciente>(this.url, paciente).pipe(
      catchError(this.handleError)
    )
  }

  updatePaciente(paciente:paciente):Observable<paciente>{
    return this.http.put<paciente>(this.url, paciente).pipe(
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
