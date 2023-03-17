import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFormUsuarioComponent } from '../modal-form-usuario/modal-form-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  modalRef?: BsModalRef;
  constructor (private modalService: BsModalService){
   
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
}
