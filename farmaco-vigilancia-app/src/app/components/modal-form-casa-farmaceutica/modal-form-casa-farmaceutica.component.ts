import { Component } from '@angular/core';
import { CasaFarmaceutica  } from 'src/app/interfaces/casa-farmaceutica.interface';
import { BsModalRef} from 'ngx-bootstrap/modal'; 
import { CasaFarmaceuticaService } from '../../services/casa-farmaceutica.service';

@Component({
  selector: 'app-modal-form-casa-farmaceutica',
  templateUrl: './modal-form-casa-farmaceutica.component.html',
  styleUrls: ['./modal-form-casa-farmaceutica.component.css']
})
export class ModalFormCasaFarmaceuticaComponent {

  insertar:boolean = true; 
  
  casaFarmaceutica: CasaFarmaceutica = {
    id: "", 
    nombre: "",
    observaciones: ""
  }; 

  constructor(public modalRef: BsModalRef,
    private srvCasaFarmaceutica: CasaFarmaceuticaService) {
    this.insertar = true; 
  } 

  
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Casa Farmaceutica";

  guardar(){
    console.log(this.casaFarmaceutica);
  }


  getCasaFarmaceutica(id:string){
    this.srvCasaFarmaceutica.getCasaFarmaceutica(id).subscribe(result => this.casaFarmaceutica = result)
  }
}
