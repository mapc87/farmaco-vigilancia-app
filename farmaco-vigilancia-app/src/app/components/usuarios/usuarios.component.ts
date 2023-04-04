import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFormUsuarioComponent } from '../modal-form-usuario/modal-form-usuario.component';
import { UsuarioServiceService } from '../../services/usuario.service.service';
import { usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  modalRef?: BsModalRef;
  usuarios: usuario[] = []

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
      console.log(result)
    })
  }
}
