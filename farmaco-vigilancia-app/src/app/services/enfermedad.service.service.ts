import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { enfermedad } from '../interfaces/enfermedad.interface';
import { urlBackend } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadServiceService {

  private url =  '/enfermedades' 

  constructor(private http: HttpClient) { }

  getEnfermedad(id:string){
    return this.http.get<enfermedad>(this.url); 
  }

  getEnfermedades():Observable<enfermedad[]>{
    return this.http.get<enfermedad[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addEnfermedad(enfermedad: enfermedad):Observable<enfermedad>{
    console.log(enfermedad);
    return this.http.post<enfermedad>(this.url, enfermedad).pipe(
      catchError(this.handleError)
    )
  }

  updateEnfermedad(enfermedad:enfermedad):Observable<enfermedad>{
    return this.http.put<enfermedad>(this.url, enfermedad).pipe(
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
