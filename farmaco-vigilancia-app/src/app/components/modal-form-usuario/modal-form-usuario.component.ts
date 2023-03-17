import { Component } from '@angular/core';
import { usuario  } from 'src/app/interfaces/usuario.interface';
import { BsModalRef} from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-modal-form-usuario',
  templateUrl: './modal-form-usuario.component.html',
  styleUrls: ['./modal-form-usuario.component.css']
})

export class ModalFormUsuarioComponent {
  insertar:boolean = true; 
  usuario: usuario = {
    id: "", 
    nombre: "",
    usuario: "",
    password: "",
    rol: 0
  }; 

  constructor(public modalRef: BsModalRef) {
    this.insertar = true; 
  } 

  
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Usuario";


  guardar(){
    console.log(this.usuario);
  }

}
