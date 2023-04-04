import { Injectable } from '@angular/core';
import { CasaFarmaceutica } from '../interfaces/casa-farmaceutica.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CasaFarmaceuticaService {

  constructor(
    private http: HttpClient
  ) { 
    
  }

  
}
