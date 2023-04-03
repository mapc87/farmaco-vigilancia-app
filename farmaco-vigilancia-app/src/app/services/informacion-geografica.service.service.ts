import { Injectable } from '@angular/core';
import { zonaGeograficaGuatemala } from '../constantes';

@Injectable({
  providedIn: 'root'
})

export class InformacionGeograficaServiceService {

  private informacionGeografica;

  constructor() { 
    this.informacionGeografica = zonaGeograficaGuatemala;
  }

  obtenerDepartamentos(){
    let departamentos: string[] = []        
    this.informacionGeografica.departamentos.forEach(item =>{
        departamentos.push(item.departamento);
    })    

    return departamentos;
  };

  obtenerMunicipios(departamento: string){
  let municipios = this.informacionGeografica.departamentos.find(el => 
      el.departamento == departamento
  )?.municipios; 

  return municipios
}

}
