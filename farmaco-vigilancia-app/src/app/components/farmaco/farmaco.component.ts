import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormModalFarmacoComponent } from '../form-modal-farmaco/form-modal-farmaco.component';

@Component({
  selector: 'app-farmaco',
  templateUrl: './farmaco.component.html',
  styleUrls: ['./farmaco.component.css']
})
export class FarmacoComponent {
  modalRef?: BsModalRef;
  constructor (private modalService: BsModalService){
   
  }

  abrirFarmacoModal(){
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'open modal '
        ],
        title: 'Farmaco Modal'
      }      
    };
    this.modalRef = this.modalService.show(FormModalFarmacoComponent, initialState);
    
  }
}
