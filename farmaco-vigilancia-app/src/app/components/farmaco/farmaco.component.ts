import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormModalFarmacoComponent } from '../form-modal-farmaco/form-modal-farmaco.component';
import { FarmacoServiceService } from '../../services/farmaco.service.service';
import { farmaco } from 'src/app/interfaces/farmaco.interface';
import { CasaFarmaceuticaService } from 'src/app/services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/interfaces/casa-farmaceutica.interface';
import { PageEvent } from '@angular/material/paginator';

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
    casa:'',
    efectosAdversos: [],
    efectosAdversosNoReportados: []
  }

  casasFarmaceuticas: CasaFarmaceutica[]  = [];

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

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
      console.log(result);
    });
    console.log(this.farmaco);
  }

  getCasasFarmaceuticas(){
     this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe(result => {
      this.casasFarmaceuticas = result; 
     });
  }

  onChange(changedDropdown: string){

  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }
}
