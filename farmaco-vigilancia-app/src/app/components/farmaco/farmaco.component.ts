import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormModalFarmacoComponent } from '../form-modal-farmaco/form-modal-farmaco.component';
import { FarmacoServiceService } from '../../services/farmaco.service.service';
import { farmaco } from 'src/app/interfaces/farmaco.interface';

@Component({
  selector: 'app-farmaco',
  templateUrl: './farmaco.component.html',
  styleUrls: ['./farmaco.component.css']
})
export class FarmacoComponent implements OnInit{

  modalRef?: BsModalRef;
  private farmacos: farmaco[] = [];

  private farmaco: farmaco = {
    id: '',
    nombre: '',
    observaciones: '',
    casa: {
      id: '',
      nombre: '',
      observaciones: ''
    },
    efectosAdversos: [],
    efectosAdversosNoReportados: []
  }

  constructor (
    private modalService: BsModalService, 
    private srvFarmaco: FarmacoServiceService){
  }

  ngOnInit(): void {
    this.getFarmacos();
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

  getFarmacos(){
    this.srvFarmaco.getFarmacos().subscribe((result)=>{
      this.farmacos = result; 
      console.log(this.farmacos);
    })
  }
}
