import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { urlBackend } from '../../constantes';
import { usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  private url: string = `${urlBackend}/usuarios`;

  getUsuario(id:string){
    return this.http.get<usuario>(this.url); 
  }

  getUsuarios():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.url,{responseType: 'json'}).pipe(
      catchError(this.handleError)
    ); 
  }

  addUsuario(usuario: usuario):Observable<usuario>{
    return this.http.post<usuario>(this.url, usuario).pipe(
      catchError(this.handleError)
    )
  }

  updateUsuario(usuario:usuario):Observable<usuario>{
    return this.http.put<usuario>(`${this.url}/${usuario._id}`, usuario).pipe(
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
