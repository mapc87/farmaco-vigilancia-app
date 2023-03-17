import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { enfermedad } from 'src/app/interfaces/enfermedad.interface';

@Component({
  selector: 'app-modal-form-enfermedad',
  templateUrl: './modal-form-enfermedad.component.html',
  styleUrls: ['./modal-form-enfermedad.component.css']
})
export class ModalFormEnfermedadComponent {
  insertar:boolean = true; 
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Enfermedad";

  enfermedad: enfermedad = {
    id: "", 
    nombre: "",
    observaciones: ""
  }; 

  constructor(public modalRef: BsModalRef) {
    this.insertar = true; 
  }   

  guardar(){
    console.log(this.enfermedad);
  }

}
