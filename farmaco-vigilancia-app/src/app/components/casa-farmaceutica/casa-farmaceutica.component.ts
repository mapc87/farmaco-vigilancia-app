import { Component } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions} from 'ngx-bootstrap/modal'; 
import { ModalFormCasaFarmaceuticaComponent } from '../modal-form-casa-farmaceutica/modal-form-casa-farmaceutica.component';

@Component({
  selector: 'app-casa-farmaceutica',
  templateUrl: './casa-farmaceutica.component.html',
  styleUrls: ['./casa-farmaceutica.component.css']
})
export class CasaFarmaceuticaComponent {

  modalRef?: BsModalRef;
  constructor (private modalService: BsModalService){
   
  }

  abrirCasaFarmaceuticaModal(){
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'open modal '
        ],
        title: 'Casa farmaceutica Modal'
      }      
    };
    this.modalRef = this.modalService.show(ModalFormCasaFarmaceuticaComponent, initialState);
    this.modalRef.content.closeBtnName='Close';
  }
}
