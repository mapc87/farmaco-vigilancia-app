import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';

import { CasaFarmaceuticaService } from 'src/app/admin/services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/admin/interfaces/casa-farmaceutica.interface';
import { farmaco } from '../../interfaces/farmaco.interface';
import { FarmacoServiceService } from '../../services/farmaco.service.service';
import { EfectosAdversosComponent } from '../efectos-adversos/efectos-adversos.component';
import { ModalEfectosComponent } from '../../modals/form-modal-farmaco/form-modal-efectos.component';
import { ToastrService } from 'ngx-toastr';

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

  @ViewChild('formularioFarmaco') form:any;

  constructor (
    private modalService: BsModalService, 
    private srvFarmaco: FarmacoServiceService,
    private srvCasaFarmaceutica: CasaFarmaceuticaService,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getFarmacos();
    this.getCasasFarmaceuticas();
  }

  getFarmacos(){
    this.srvFarmaco.getFarmacos.subscribe((result)=>{
      this.farmacos = result; 
    })
  }

  getCasasFarmaceuticas(){
     this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe(result => {
      this.casasFarmaceuticas = result; 
     });
  }

  Guardar(){
    if(this.farmaco._id){
      this.updateFarmaco(); 
    }else{
      this.addFarmaco();
    }
  }
  
  addFarmaco(){
    this.farmaco.estado = true;
    this.srvFarmaco
      .addFarmacos(this.farmaco)
      .subscribe((result)=>{        
        this.toastr.success("Farmaco guardado");
        this.getFarmacos();
        this.limpiarFormulario();
    });
  }

  updateFarmaco(){
    this.srvFarmaco
      .updateFarmacos(this.farmaco)
      .subscribe(result => {
        this.toastr.success("Farmaco actualizado");
        this.getFarmacos();
        this.limpiarFormulario();
      });
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

  limpiarFormulario(){
    this.form.reset();
    this.farmaco.efectosAdversosNoReportados = [];
    this.farmaco.efectosAdversos = [];
  }
}
