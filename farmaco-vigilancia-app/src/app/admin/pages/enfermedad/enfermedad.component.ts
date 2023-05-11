import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';
import { enfermedad } from '../../interfaces/enfermedad.interface';
import { EnfermedadServiceService } from '../../services/enfermedad.service.service';
import { ToastrService } from 'ngx-toastr';


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

  @ViewChild('formularioEnfermedad') form: any;

  constructor (
    private modalService: BsModalService,
    private srvEnfermedad: EnfermedadServiceService,
    private toastr: ToastrService){   
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
    if(this.enfermedad._id){
      this.ActualizarEnfermedad();
       }else{
      this.InsertarEnfermedad();
    }
  }

  InsertarEnfermedad(){
    this.enfermedad.estado = true;
    this.srvEnfermedad
      .addEnfermedad(this.enfermedad)
      .subscribe(result => {
        this.toastr.success("Enfermedad guardada")
        this.form.reset();
        this.getEnfermedades();
      });
  }

  ActualizarEnfermedad(){
    this.srvEnfermedad
      .updateEnfermedad(this.enfermedad)
      .subscribe(result => {
        this.toastr.success("Enfermedad actualizada")
        this.form.reset();
        this.getEnfermedades();
      });
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

  ActualizarRow(enfermedadSeleccionada: enfermedad){
    this.enfermedad = enfermedadSeleccionada; 
  }
}
