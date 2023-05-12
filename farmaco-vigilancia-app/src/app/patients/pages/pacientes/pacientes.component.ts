import { Component, OnInit, TemplateRef } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { PacienteServiceService } from 'src/app/patients/services/paciente.service.service';
import { RouterLink } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { PageEvent } from '@angular/material/paginator';
import { BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html'
})

export class PacientesComponent implements OnInit {
  
  pacientes: paciente[] = [];

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;


  private paciente: paciente = {
    _id: '',
    nombre: '',
    noRegistro: '',
    dpi: '',
    sexo: '',
    etnia: '',
    deptoNacimiento: '',
    deptoResidencia: '',
    municipioNacimiento: '',
    municipioResidencia: '',
    direccion: '',
    telefono: '',
    nombreEncargado: '',
    telefonoEncargado: '',
    datosClinicos: [],
    fechaIngreso: new Date(),
    estado: false,
    observaciones: ''
  }; 
  modalRef: any;

  constructor(private srvPaciente:  PacienteServiceService,private modalService: BsModalService, ) {   
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacienteById(id:string){
    this.srvPaciente.getPaciente(id).subscribe((result)=> { this.paciente = result})
  }

  getPacientes(){
    this.srvPaciente.getPacientes.subscribe((result) =>{
      this.pacientes = result; 
      console.log(this.pacientes);
    });
  }  

  agregarDatosClinicos(paciente: paciente){

  }

  updateEstadoPaciente(){
    this.srvPaciente.updatePaciente(this.paciente._id).subscribe(result => {
      this.getPacientes();
    })
  }

  confirm(): void {   
    this.paciente.estado = this.paciente.estado == true? false: true;
    this.updateEstadoPaciente();
    this.modalRef?.hide();        
  }

  decline(): void {
    this.modalRef?.hide();
  }
  
  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  openModal(template: TemplateRef<any>, paciente: paciente) {
    this.paciente = paciente;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }  

  actualizarPaciente(paciente: paciente){

  }

}
