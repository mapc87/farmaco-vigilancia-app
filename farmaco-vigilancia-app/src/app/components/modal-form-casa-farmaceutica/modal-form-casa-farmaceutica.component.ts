import { Component } from '@angular/core';
import { CasaFarmaceutica  } from 'src/app/interfaces/casa-farmaceutica.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-form-casa-farmaceutica',
  templateUrl: './modal-form-casa-farmaceutica.component.html',
  styleUrls: ['./modal-form-casa-farmaceutica.component.css']
})
export class ModalFormCasaFarmaceuticaComponent {

  insertar:boolean = true; 
  casaFarmaceutica: CasaFarmaceutica = {
    id: 0, 
    nombre: "",
    observaciones: ""
  }; 

  constructor() {
    this.insertar = true; 
  } 

  
  textoAccion = this.insertar == true ? "Agregar": "Actualizar";

  guardar(){
    console.log(this.casaFarmaceutica);
  }

}
