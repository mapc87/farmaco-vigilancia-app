import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFormEnfermedadComponent } from '../modal-form-enfermedad/modal-form-enfermedad.component';

@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.css']
})
export class EnfermedadComponent {
  modalRef?: BsModalRef;
  constructor (private modalService: BsModalService){   
  }

  abrirEnfermedadModal(){
    console.log("entro")
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'open modal '
        ],
        title: 'Enfermedad Modal'
      }      
    };
    this.modalRef = this.modalService.show(ModalFormEnfermedadComponent, initialState);
    this.modalRef.content.closeBtnName='Close';
  }
}
