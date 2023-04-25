import { Injectable } from '@angular/core';
import { CasaFarmaceutica } from '../interfaces/casa-farmaceutica.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { urlBackend } from '../constantes';

@Injectable({
  providedIn: 'root'
})

export class CasaFarmaceuticaService {

  constructor(private http: HttpClient) { }

  private url: string = `${urlBackend}/casaFarmaceutica`;

  getCasaFarmaceutica(id:string){
    return this.http.get<CasaFarmaceutica>(this.url); 
  }

  getCasasFarmaceuticas():Observable<CasaFarmaceutica[]>{
    return this.http.get<CasaFarmaceutica[]>(this.url, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addCasaFarmaceutica(casaFarmaceutica: CasaFarmaceutica):Observable<CasaFarmaceutica>{
    console.log(casaFarmaceutica)
    return this.http.post<CasaFarmaceutica>(this.url, casaFarmaceutica).pipe(
      catchError(this.handleError)
    )
  }

  updateCasaFarmaceutica(casaFarmaceutica:CasaFarmaceutica):Observable<CasaFarmaceutica>{
    return this.http.put<CasaFarmaceutica>(this.url, casaFarmaceutica).pipe(
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
