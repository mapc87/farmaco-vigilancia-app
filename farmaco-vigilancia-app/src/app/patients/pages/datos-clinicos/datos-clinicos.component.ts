import { Component, Input, OnInit } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { datosClinicos } from '../../interfaces/datos-clinicos';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { EnfermedadServiceService } from 'src/app/admin/services/enfermedad.service.service';
import { enfermedad } from 'src/app/admin/interfaces/enfermedad.interface';
import { estadioEnfermedad, quimioterapia } from 'src/app/constantes';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-clinicos',
  templateUrl: './datos-clinicos.component.html'
})
export class DatosClinicosComponent implements OnInit  {

  list: any[] = [];
  accion: string = "Agregar"; 
  private paciente : paciente = {
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
    fechaIngreso: new Date(),
    datosClinicos: [],
    estado: false,
    observaciones: ''
  }
    
  enfermedades: enfermedad[] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  farmacos: farmaco [] = [];
  farmacosSeleccionados: farmaco[] = [];

  
  farmaco: farmaco = {
    nombre: '',
    casa: '',
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    observaciones: '',
    estado: false,
    seleccionado: false
  }
  
  datoClinico : datosClinicos = {
    diagnostico: '',
    estadioEnfermedad: '',
    fechaIngresoUnidad: '',
    quimioterapia: '',
    cicloNo: '',
    fecha: '',
    farmacosUtilizados: []
  }

  ngOnInit(): void {
    this.getEnfermedades();
    this.estadioEnfermedad = estadioEnfermedad;
    this.quimioterapia = quimioterapia;   
    this.getFarmacos()
    this.paciente = this.list[0]; 
    
    if(this.list[1]){
      this.accion = "Actualizar";
      this.datoClinico = this.list[1][0];
      console.log(this.datoClinico);
    }  
  }

  constructor(
    private srvPaciente : PacienteServiceService,
    private srvEnfermedad: EnfermedadServiceService,
    public modalRef: BsModalRef,
    private srvFarmacos: FarmacoServiceService,
    private toastr: ToastrService
  ){     
    
  }

  getEnfermedades(){
    this.srvEnfermedad.getEnfermedades().subscribe(result => {
      this.enfermedades = result;
    });
  }

  guardar(){   
    this.datoClinico.farmacosUtilizados = this.farmacosSeleccionados;
    this.paciente.datosClinicos.push(this.datoClinico);
    this.srvPaciente.updatePaciente(this.paciente).subscribe(
      result => {
        this.toastr.success("Dato clinico guardado");
        this.modalRef.hide();
      }
    );
  }

  getFarmacos(){
    this.srvFarmacos.getFarmacos.subscribe(result => {
      this.farmacos = result; 
    })
  } 
  
  agregar(farmaco:farmaco, event : any){
    this.farmaco = farmaco; 
    this.farmaco.seleccionado = this.farmaco.seleccionado == true ? false: true;  

     if(this.farmaco.seleccionado){
       this.farmacosSeleccionados.push(farmaco);
     }else{
      this.farmacosSeleccionados.splice(this.farmacosSeleccionados.findIndex(f => f._id == this.farmaco._id),1);
     }
  }

}
