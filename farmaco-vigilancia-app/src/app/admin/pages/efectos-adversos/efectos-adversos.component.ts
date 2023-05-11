import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';



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
 
  constructor(  
    private modalService: BsModalService,
    private srvEfectoAdverso: EfectosAdversosServiceService,
    private toastr: ToastrService) {    
  }

  @ViewChild('formularioEfectosAdversos') form: any;

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
      this.form.reset();
      this.toastr.success("Efecto adverso guardado");
      this.getEfectosAdversos();
    }); 
   
  }

  updateEfectoAdverso(){
    this.srvEfectoAdverso.updategetEfectoAdverso(this.efectoAdverso).subscribe(result => {
      this.form.reset();
      this.toastr.success("Efecto adverso actualizado");
      this.getEfectosAdversos();
    }); 
  }

  Guardar(){
    if(this.efectoAdverso._id){
      this.updateEfectoAdverso();
    }else{
      this.AddEfectoAdverso();
    }
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

  ActualizarRow(efectoSeleccionado: efectosAdversos){
    this.efectoAdverso = efectoSeleccionado; 
  }
}
