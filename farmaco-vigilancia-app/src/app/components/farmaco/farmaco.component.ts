import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormModalFarmacoComponent } from '../form-modal-farmaco/form-modal-farmaco.component';
import { FarmacoServiceService } from '../../services/farmaco.service.service';
import { farmaco } from 'src/app/interfaces/farmaco.interface';
import { CasaFarmaceuticaService } from 'src/app/services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/interfaces/casa-farmaceutica.interface';

@Component({
  selector: 'app-farmaco',
  templateUrl: './farmaco.component.html'
})
export class FarmacoComponent implements OnInit{

  modalRef?: BsModalRef;
  farmacos: farmaco[] = []; 

  farmaco: farmaco = {
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

  casasFarmaceuticas: CasaFarmaceutica[]  = [];

  constructor (
    private modalService: BsModalService, 
    private srvFarmaco: FarmacoServiceService,
    private srvCasaFarmaceutica: CasaFarmaceuticaService){
  }

  ngOnInit(): void {
    this.getFarmacos();
    this.getCasasFarmaceuticas();
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
    this.srvFarmaco.getFarmacos.subscribe((result)=>{
      this.farmacos = result; 
      console.log(this.farmacos);
    })
  }

  addFarmaco(){
    this.srvFarmaco.addFarmacos(this.farmaco).subscribe((result)=>{
      console.log("guardado")
    });
  }

  getCasasFarmaceuticas(){
     this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe(result => {
      this.casasFarmaceuticas = result; 
      console.log(this.casasFarmaceuticas);
     });
  }
}
