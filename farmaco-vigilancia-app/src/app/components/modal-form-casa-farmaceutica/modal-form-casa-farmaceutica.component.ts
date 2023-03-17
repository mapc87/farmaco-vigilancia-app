import { Component } from '@angular/core';
import { CasaFarmaceutica  } from 'src/app/interfaces/casa-farmaceutica.interface';
import { BsModalRef} from 'ngx-bootstrap/modal'; 

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

  constructor(public modalRef: BsModalRef) {
    this.insertar = true; 
  } 

  
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Casa Farmaceutica";

  guardar(){
    console.log(this.casaFarmaceutica);
  }


}
