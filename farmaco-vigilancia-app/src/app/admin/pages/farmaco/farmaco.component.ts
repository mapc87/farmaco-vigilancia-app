import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';

import { CasaFarmaceuticaService } from 'src/app/admin/services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/admin/interfaces/casa-farmaceutica.interface';
import { farmaco } from '../../interfaces/farmaco.interface';
import { FarmacoServiceService } from '../../services/farmaco.service.service';
import { FormModalFarmacoComponent } from '../../../components/form-modal-farmaco/form-modal-farmaco.component';
import { EfectosAdversosComponent } from '../efectos-adversos/efectos-adversos.component';
import { ModalEfectosComponent } from '../../modals/form-modal-farmaco/form-modal-efectos.component';

@Component({
  selector: 'app-farmaco',
  templateUrl: './farmaco.component.html'
})
export class FarmacoComponent implements OnInit{

  modalRef?: BsModalRef;
  farmacos: farmaco[] = []; 

  farmaco: farmaco = {
    nombre: '',
    observaciones: '',
    casa:'',
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    estado: false
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

  getFarmacos(){
    this.srvFarmaco.getFarmacos.subscribe((result)=>{
      this.farmacos = result; 
      console.log(this.farmacos);
    })
  }

  addFarmaco(){
    this.farmaco.estado = true;
    this.srvFarmaco.addFarmacos(this.farmaco).subscribe((result)=>{
      console.log(result);
    });
  }

  getCasasFarmaceuticas(){
     this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe(result => {
      this.casasFarmaceuticas = result; 
     });
  }

  Guardar(){
    if(this.farmaco.hasOwnProperty('_id')){
      console.log("upadte")
      this.updateFarmaco();
      
    }else{
      this.addFarmaco();
    }
    this.LimpiarFarmaco();
  }

  updateFarmaco(){
    console.log("upadte")
    this.srvFarmaco.updateFarmacos(this.farmaco).subscribe(result => console.log(result));
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  openModal(template: TemplateRef<any>, farmaco: farmaco) {
    this.farmaco = farmaco;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {   
      this.farmaco.estado = this.farmaco.estado == true? false: true;
      this.Guardar();
      this.modalRef?.hide();        
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  LimpiarFarmaco(){
    this.farmaco.nombre = ""; 
    this.farmaco.casa = "";
    this.farmaco.efectosAdversos = [];
    this.farmaco.efectosAdversosNoReportados = [];
    this.farmaco.observaciones = "";
    this.farmaco.estado = false;
  }

  ActualizarRow(farmacoSeleccionado: farmaco){
    this.farmaco = farmacoSeleccionado; 
  }

  abrirEfectosModal(farmaco: farmaco){
    const initialState: ModalOptions = {
      initialState: {
        list: [
          farmaco
        ],
        title: 'Efectos Adversos'
      }      
    };
    this.modalRef = this.modalService.show(ModalEfectosComponent, initialState);
    this.modalRef.content.closeBtnName='Close';
  }
}
