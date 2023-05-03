import { Component, OnInit, TemplateRef } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-efectos-adversos',
  templateUrl: './efectos-adversos.component.html'
})
export class EfectosAdversosComponent implements OnInit {

  efectosAdversos: efectosAdversos[] =[];
  efectoAdverso: efectosAdversos = {
    efectoAdverso: '',
    observaciones: '',
    estado: false
  }

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;
  modalRef: any;
 
  constructor(private modalService: BsModalService,private srvEfectoAdverso: EfectosAdversosServiceService) {    
  }

  ngOnInit(): void {
    this.getEfectosAdversos();
  }

  agregarEfecto(){
    this.srvEfectoAdverso.addgetEfectoAdverso(this.efectoAdverso).subscribe();
  }

  getEfectosAdversos(){
    this.srvEfectoAdverso.getEfectosAdversos.subscribe(result => {
        this.efectosAdversos = result;
    });
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  getEfectoAdverso(id: string){
    this.srvEfectoAdverso.getEfectoAdverso(id).subscribe(result => this.efectoAdverso);
  }

  AddEfectoAdverso(){
    this.efectoAdverso.estado = true;
    this.srvEfectoAdverso.addgetEfectoAdverso(this.efectoAdverso).subscribe(result => {
      console.log(result);
    }); 
    this.getEfectosAdversos();
  }

  updateEfectoAdverso(){
    this.srvEfectoAdverso.updategetEfectoAdverso(this.efectoAdverso).subscribe(result => {
      console.log(result)
    }); 
  }

  Guardar(){
    if(this.efectoAdverso.hasOwnProperty('_id')){
      this.updateEfectoAdverso();
    }else{
      this.AddEfectoAdverso();
    }
    this.LimpiarEfecto();
  }

  openModal(template: TemplateRef<any>, efecto: efectosAdversos) {
    this.efectoAdverso = efecto;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {   
      this.efectoAdverso.estado = this.efectoAdverso.estado == true? false: true;
      this.Guardar();
      this.modalRef?.hide();        
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  LimpiarEfecto(){
    this.efectoAdverso.efectoAdverso = '';
    this.efectoAdverso.estado = false;
    this.efectoAdverso.observaciones = "";
  }

  ActualizarRow(efectoSeleccionado: efectosAdversos){
    this.efectoAdverso = efectoSeleccionado; 
  }
}
