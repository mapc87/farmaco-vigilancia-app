import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';
import { enfermedad } from '../../interfaces/enfermedad.interface';
import { EnfermedadServiceService } from '../../services/enfermedad.service.service';


@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html'
})
export class EnfermedadComponent implements OnInit{
  modalRef?: BsModalRef;
  enfermedades: any[] = [];  
  enfermedad: enfermedad = {
    nombre: '',
    observaciones: '',
    estado: true
  }; 

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

  constructor (private modalService: BsModalService, private srvEnfermedad: EnfermedadServiceService){   
  }

  ngOnInit(): void {    
    this.getEnfermedades();
  }

  getEnfermedadById(id:string){
    this.srvEnfermedad.getEnfermedad(id).subscribe((result)=> { this.enfermedad = result})
    console.log(this.enfermedad);
  }

  getEnfermedades(){
    this.srvEnfermedad.getEnfermedades().subscribe((result:any[]) =>{
      this.enfermedades = result;  
    });
  }  

  guardar(){
    if(this.enfermedad.hasOwnProperty('_id')){
      this.ActualizarEnfermedad();
       }else{
      this.InsertarEnfermedad();
    }
    this.LimpiarEnfermedad();
  }

  InsertarEnfermedad(){
    this.enfermedad.estado = true;
    this.srvEnfermedad.addEnfermedad(this.enfermedad).subscribe(result => console.log(result));
  }

  ActualizarEnfermedad(){
    this.srvEnfermedad.updateEnfermedad(this.enfermedad).subscribe(result => console.log(result));
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  openModal(template: TemplateRef<any>, enfermedad: enfermedad) {
    this.enfermedad = enfermedad;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {   
      this.enfermedad.estado = this.enfermedad.estado == true? false: true;
      this.guardar();
      this.modalRef?.hide();        
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  LimpiarEnfermedad(){
    this.enfermedad.nombre = '';
    this.enfermedad.estado = false;
    this.enfermedad.observaciones = "";
  }

  ActualizarRow(enfermedadSeleccionada: enfermedad){
    this.enfermedad = enfermedadSeleccionada; 
  }
}
