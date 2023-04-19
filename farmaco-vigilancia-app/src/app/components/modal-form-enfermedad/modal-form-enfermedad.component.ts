import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { enfermedad } from 'src/app/interfaces/enfermedad.interface';
import { EnfermedadServiceService } from 'src/app/services/enfermedad.service.service';

@Component({
  selector: 'app-modal-form-enfermedad',
  templateUrl: './modal-form-enfermedad.component.html'
})
export class ModalFormEnfermedadComponent {
  insertar:boolean = true; 
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Enfermedad";
  enfermedad: enfermedad = {
    id: "", 
    nombre: "",
    observaciones: ""
  }; 

  constructor(public modalRef: BsModalRef, private srv: EnfermedadServiceService) {
    this.insertar = true; 
  }   

  guardar(){
    this.srv.addEnfermedad(this.enfermedad).subscribe();
  }

  actualizar(){
    this.srv.updateEnfermedad(this.enfermedad).subscribe();
  }
}
