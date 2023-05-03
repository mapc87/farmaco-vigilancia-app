import { Component, OnInit } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal'; 
import { UsuarioServiceService } from '../../admin/services/usuario.service.service';
import { usuario } from 'src/app/admin/interfaces/usuario.interface';

@Component({
  selector: 'app-modal-form-usuario',
  templateUrl: './modal-form-usuario.component.html'
})

export class ModalFormUsuarioComponent implements OnInit {
  
  insertar:boolean = true; 
  titulo: string = ""
  

 
  usuario: usuario = {
    id: "", 
    nombre: "",
    usuario: "",
    password: "",
    rol: 0,
    estado: false
  }; 

  constructor(
    public modalRef: BsModalRef,
    private srvUsuario: UsuarioServiceService) {
    this.insertar = true; 
  } 
  ngOnInit(): void {
    this.titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Usuario";    
  }
   
  getUsuario(id:string){
    this.srvUsuario.getUsuario(id).subscribe(result => {
      this.usuario =  result
      console.log(result);
    });
  }

  addUsuario(){
    this.srvUsuario.addUsuario(this.usuario).subscribe(result => {
      console.log(result);
    })
  }

  updateUsuario(){
    this.srvUsuario.updateUsuario(this.usuario).subscribe(result => {
      console.log(result);
    })
  }

}
