import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { genero, estadioEnfermedad, quimioterapia, etnia } from 'src/app/constantes';
import { InformacionGeograficaServiceService } from 'src/app/patients/services/informacion-geografica.service.service';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { enfermedad } from 'src/app/admin/interfaces/enfermedad.interface';
import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { paciente } from '../../interfaces/paciente';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { EnfermedadServiceService } from 'src/app/admin/services/enfermedad.service.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-form-paciente',
  templateUrl: './modal-form-paciente.component.html',
  styles: [
  ]
})
export class ModalFormPacienteComponent {

  generos: string [] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  etnia: string[] = []; 
  departamentos: string[] = []; 
  municipios?: string[] = [];
  enfermedades: enfermedad[] = []; 
  farmacos: farmaco[] = []
  list: any[] = [];

  paciente: paciente = {
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
    fechaIngreso: new Date(),
    estado: true,
    observaciones: '',
    fechaNacimiento: new Date()
  }

  municipiosNacimiento: string[] | undefined;
  municipiosResidencia: string[] | undefined;

  accion: string = "Agregar";

  @ViewChild('formularioPaciente') form: any; 

  constructor(
    public modalRef: BsModalRef,
    private informacionGeografica: InformacionGeograficaServiceService, 
    private modalService: BsModalService,   
    private srvPaciente: PacienteServiceService,
    private srvFarmaco: FarmacoServiceService,
    private srvEnfermedad: EnfermedadServiceService,
    private toastr: ToastrService
  ){
     
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

    if(this.list[0]._id){
      console.log()
      this.paciente = this.list[0];
      this.accion = "Actualizar"
    }
  }
  
  ObtenerMunicipiosDeptoNacimiento(value: any){
    this.municipiosNacimiento = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoNacimiento);
    this.paciente.municipioNacimiento = this.municipiosNacimiento != undefined ? this.municipiosNacimiento[0]:"";
  }

  ObtenerMunicipiosDeptoResedencia(value:any){
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
      result.forEach(e => {
        if(e.estado){
          this.enfermedades.push(e);
        }
      })
    });
  }

  getPaciente(id:string){
    this.srvPaciente.getPaciente(id).subscribe((result)=> { this.paciente = result})
  }

  addPaciente(){
    this.srvPaciente.addPaciente(this.paciente).subscribe(result => {
      this.clear();
      this.toastr.success("Paciente Guardado");
      this.modalRef.hide();
    })
  }

  updatePaciente(){
    this.srvPaciente.updatePaciente(this.paciente).subscribe(result => {
      this.toastr.success("Paciente Actualizado");
      this.clear();
      this.modalRef.hide();
    })
  }

  guardar(){
    if(this.paciente._id){
      this.updatePaciente();
    }else{
      this.addPaciente();
    }
  }

  clear(){
    this.paciente = { nombre: "",
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
      fechaIngreso: new Date(),
      estado: true,
      observaciones: '',
      fechaNacimiento: new Date(),
    }
    this.list[0]._id  = "";
  }
}
