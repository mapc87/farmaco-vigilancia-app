import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { datosClinicos } from '../../interfaces/datos-clinicos';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { EnfermedadServiceService } from 'src/app/admin/services/enfermedad.service.service';
import { enfermedad } from 'src/app/admin/interfaces/enfermedad.interface';
import { estadioEnfermedad, quimioterapia } from 'src/app/constantes';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
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
  actualizacion: boolean = false; 

  paciente : paciente = {
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
    observaciones: '',
    fechaNacimiento: new Date()
  }
    
  enfermedades: enfermedad[] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  farmacos: farmaco [] = [];
  farmacosSeleccionados: farmaco[] = [];
  datosClinicos: datosClinicos [] = [];

  
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
    farmacosUtilizados: [],
    estado: false,
    observaciones: ''
  }

  ngOnInit(): void {
    this.getEnfermedades();
    this.estadioEnfermedad = estadioEnfermedad;
    this.quimioterapia = quimioterapia;   
    this.getFarmacos()
    this.paciente = this.list[0]; 
    
    if(this.list[0]){
      console.log(this.list[0]);
    }  
  }

  constructor(
    private srvPaciente : PacienteServiceService,
    private srvEnfermedad: EnfermedadServiceService,
    public modalRef: BsModalRef,
    public modalRefConfirm: BsModalRef,
    private srvFarmacos: FarmacoServiceService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ){     
    
  }

  getEnfermedades(){
    this.srvEnfermedad.getEnfermedades().subscribe(result => {
      result.forEach(r => {
        if(r.estado){
          this.enfermedades.push(r);
        }       
      })   
    });
  }

  guardar(){   
    this.datoClinico.farmacosUtilizados = this.farmacosSeleccionados;
    let mensaje:string  = "actualizado"

    if(!this.actualizacion){
      this.paciente.datosClinicos.push(this.datoClinico);
      this.datoClinico.estado = true; 
      mensaje = "guardado"
    } 

    this.srvPaciente.updatePaciente(this.paciente).subscribe(
      result => {
          this.toastr.success("Dato clinico " + mensaje); 
          this.actualizacion = false;  
          this.farmacosSeleccionados = [];
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

  actualizarDatosClinicos(dato:datosClinicos){
     
    this.farmacos.forEach(f => f.seleccionado = false);
    this.actualizacion = true; 

    this.datosClinicos = this.paciente.datosClinicos; 
    this.farmacosSeleccionados = dato.farmacosUtilizados;
    this.datoClinico = dato; 
  
    this.farmacos.forEach(f => {
      if(this.farmacosSeleccionados[this.farmacosSeleccionados.findIndex(fs=> fs._id == f._id)]){
        f.seleccionado = true;
      }
    });     
  }

  inactivarDatoClinico(index : number){
    if(this.paciente.datosClinicos[index].estado){
      this.paciente.datosClinicos[index].estado = false
    }else{
      this.paciente.datosClinicos[index].estado = true;
    } 
    this.actualizacion = true;  
    this.guardar();
  }

  index :number = 0;

  openModal(template: TemplateRef<any>, index: number) {
    this.index = index;
    this.modalRefConfirm = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {   
    if(this.paciente.datosClinicos[this.index].estado){
      this.paciente.datosClinicos[this.index].estado = false
    }else{
      this.paciente.datosClinicos[this.index].estado = true;
    }
 
    this.actualizacion = true;  
    this.guardar();
    this.index = 0;
    this.modalRefConfirm?.hide(); 
    this.modalRef?.hide();        
  }

  decline(): void {
    this.modalRefConfirm?.hide();
    this.modalRef?.hide();
  }  
}
