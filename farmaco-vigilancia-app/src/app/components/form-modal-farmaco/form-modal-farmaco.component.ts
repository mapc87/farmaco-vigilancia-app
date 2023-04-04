import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { farmaco } from 'src/app/interfaces/farmaco.interface';

@Component({
  selector: 'app-form-modal-farmaco',
  templateUrl: './form-modal-farmaco.component.html',
  styleUrls: ['./form-modal-farmaco.component.css']
})

export class FormModalFarmacoComponent {
  insertar:boolean = true; 
  farmaco: farmaco = {
    id: "", 
    nombre: "",
    casa: {id:0, nombre:"", observaciones:""},
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    observaciones: ""
  }; 

  constructor(public modalRef: BsModalRef) {
    this.insertar = true; 
  } 
  
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Farmaco";

  guardar(){
    console.log(this.farmaco);
  }
}
