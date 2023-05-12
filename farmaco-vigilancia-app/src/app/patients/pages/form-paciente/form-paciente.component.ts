import { Component, OnInit, TemplateRef } from '@angular/core';
import { genero, estadioEnfermedad, quimioterapia, etnia } from 'src/app/constantes';
import { InformacionGeograficaServiceService } from 'src/app/patients/services/informacion-geografica.service.service';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { enfermedad } from 'src/app/admin/interfaces/enfermedad.interface';
import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { paciente } from '../../interfaces/paciente';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { EnfermedadServiceService } from 'src/app/admin/services/enfermedad.service.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalFarmacosComponent } from '../../modals/modal-farmacos/modal-farmacos.component';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html'
})

export class FormPacienteComponent implements OnInit {

  generos: string [] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  etnia: string[] = []; 
  departamentos: string[] = []; 
  municipios?: string[] = [];
  enfermedades: enfermedad[] = []; 
  farmacos: farmaco[] = []
  modalRef?: BsModalRef;

  paciente: paciente = {
    _id: "",
    nombre: "",
    noRegistro: "",
    dpi: "",
    sexo: "M",
    etnia: "Ladino",
    deptoNacimiento: "Guatemala",
    deptoResidencia: "Guatemala",
    municipioNacimiento: "Guatemala",
    municipioResidencia: "Guatemala",
    direccion: "",
    telefono: "",
    nombreEncargado: "",
    telefonoEncargado: "",
    datosClinicos: [],
    fehaIngreso: new Date()
  }

  municipiosNacimiento: string[] | undefined;
  municipiosResidencia: string[] | undefined;

  constructor(
    private informacionGeografica: InformacionGeograficaServiceService, 
    private modalService: BsModalService, 
    
    private srvPaciente: PacienteServiceService,
    private srvFarmaco: FarmacoServiceService,
    private srvEnfermedad: EnfermedadServiceService) { 
  }

  ngOnInit(): void {
    this.departamentos = this.informacionGeografica.obtenerDepartamentos();
    this.ObtenerMunicipiosDeptoNacimiento(this.paciente.deptoNacimiento);
    this.ObtenerMunicipiosDeptoResedencia(this.paciente.deptoResidencia);
    this.getEnfermedades();

    this.generos = genero;
    this.estadioEnfermedad = estadioEnfermedad; 
    this.quimioterapia = quimioterapia;  
    this.etnia = etnia;     
  }
  
  ObtenerMunicipiosDeptoNacimiento(value: any){
    this.municipiosNacimiento = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoNacimiento);
    this.paciente.municipioNacimiento = this.municipiosNacimiento != undefined ? this.municipiosNacimiento[0]:"";
  }

  ObtenerMunicipiosDeptoResedencia(value:any){
    console.log(value);
    this.municipiosResidencia = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoResidencia);
    this.paciente.municipioResidencia = this.municipiosResidencia != undefined ? this.municipiosResidencia[0]:"";
  } 

  getFarmacos(){
    this.srvFarmaco.getFarmacos.subscribe((result)=>{
      this.farmacos = result; 
      console.log(this.farmacos);
    })
  }

  getEnfermedades(){
    this.srvEnfermedad.getEnfermedades().subscribe(result => {
      this.enfermedades = result;
      console.log(result)
    });
  }

  getPaciente(id:string){
    this.srvPaciente.getPaciente(id).subscribe((result)=> { this.paciente = result})
    console.log(this.paciente);
  }

  addPaciente(){
    this.srvPaciente.addPaciente(this.paciente).subscribe(result => {
      console.log(result);
    })
  }

  updatePaciente(){
    this.srvPaciente.updatePaciente(this.paciente).subscribe(result => {
      console.log(result);
    })
  }

  agregarMedicamentos(){
    console.log("agregar los medicamentos al listado");
  }

  openModal(template: TemplateRef<any>, farmaco: farmaco) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  abrirFarmacosModal(){
    const initialState: ModalOptions = {
      initialState: {
        list: [

        ],
        title: 'Efectos Adversos'
      }      
    };
    this.modalRef = this.modalService.show(ModalFarmacosComponent, initialState);
    this.modalRef.content.closeBtnName='Close';
  }
}
