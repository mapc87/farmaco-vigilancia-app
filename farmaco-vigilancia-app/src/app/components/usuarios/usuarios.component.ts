import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFormUsuarioComponent } from '../modal-form-usuario/modal-form-usuario.component';
import { UsuarioServiceService } from '../../services/usuario.service.service';
import { usuario } from 'src/app/interfaces/usuario.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit{

  modalRef?: BsModalRef;
  usuarios: usuario[] = []
  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

  constructor (private modalService: BsModalService,
    private srvUsuario: UsuarioServiceService){   
  }
  ngOnInit(): void {
    this.getUsuarios();
  }

  abrirUsuarioModal(){
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'open modal '
        ],
        title: 'Usuario Modal'
      }      
    };
    this.modalRef = this.modalService.show(ModalFormUsuarioComponent, initialState);
    this.modalRef.content.closeBtnName='Close';
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
}
