import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFormUsuarioComponent } from '../../../components/modal-form-usuario/modal-form-usuario.component';
import { UsuarioServiceService } from '../../services/usuario.service.service';
import { PageEvent } from '@angular/material/paginator';
import { usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit{

  modalRef?: BsModalRef;
  
  usuarios: usuario[] = [];

  usuario: usuario = {
    _id: '',
    nombre: '',
    usuario: '',
    password: '',
    rol: 0,
    estado: false
  };

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

  constructor (private modalService: BsModalService,
    private srvUsuario: UsuarioServiceService){   
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.srvUsuario.getUsuarios().subscribe(result => {
      this.usuarios = result; 
    })
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  Guardar(){

  }
}
