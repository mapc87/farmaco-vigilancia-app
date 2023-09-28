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
import { efectosAdversos } from 'src/app/admin/interfaces/efectos-adversos.interface';
import { FarmacoComponent } from '../../../admin/pages/farmaco/farmaco.component';

@Component({
  selector: 'app-datos-clinicos',
  templateUrl: './datos-clinicos.component.html'
})
export class DatosClinicosComponent implements OnInit  {


  accion: string = "Agregar";
  actualizacion: boolean = false;
  list: any[] = [];
  enfermedades: enfermedad[] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  farmacos: farmaco [] = [];
  farmacosSeleccionados: farmaco[] = [];
  datosClinicos: datosClinicos [] = [];
  efectosAdversos: efectosAdversos [] = [];
  efectosAdversosSeleccionados: efectosAdversos [] = [];

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
    datosClinicos: this.datosClinicos,
    estado: false,
    observaciones: '',
    fechaNacimiento: new Date()
  }

  farmaco: farmaco = {
    nombre: '',
    casa: '',
    efectosAdversos: [],
    observaciones: '',
    estado: false,
    seleccionado: false
  }

  efecto: efectosAdversos = {
    efectoAdverso: '',
    observaciones: '',
    seleccionado: false,
    estado: false,
    reportado: false
  }

  farmacoSeleccionado: farmaco = {
    nombre: '',
    casa: '',
    efectosAdversos: [],
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
    this.srvFarmacos.getFarmacos.subscribe(result  => {
      result.forEach(r => {
        if(r.estado){
          this.farmacos.push(r)
        }
      })
      console.log(result);
    }) 
  }

  agregarEfecto(efecto:efectosAdversos, event : any){

    let accion = event.target.checked;

    if(accion)
    {
      this.efectosAdversosSeleccionados.push(efecto);
    }else{
      this.efectosAdversosSeleccionados
          .splice(this.efectosAdversosSeleccionados
          .findIndex(e => e._id == efecto._id), 1);
    };
    
  }
  

  agregarFarmaco(calback: (thisBase:any) => void){
    this.farmacoSeleccionado.efectosAdversos = [...this.efectosAdversosSeleccionados];
    let thisBase = this;

    if(this.farmacosSeleccionados.findIndex(f => f._id == this.farmacoSeleccionado._id) == -1){
      this.farmacosSeleccionados.push(this.farmacoSeleccionado);     
      this.activarInactivarSelectFarmacos(this.farmacoSeleccionado._id, true);
      console.log(this.farmacos);
    }else{
      this.farmacosSeleccionados[this.farmacosSeleccionados.findIndex(fs => fs._id == this.farmacoSeleccionado._id)].efectosAdversos = [...this.efectosAdversosSeleccionados]
    }
    
    calback(thisBase);
  }

  activarInactivarSelectFarmacos(idFarmaco: string, estado: boolean){
    this.farmacos[this.farmacos.findIndex(f => f._id == idFarmaco)].seleccionado = estado; 
  }

  limpiarVariables(thisBase: any){

    thisBase.efectosAdversosSeleccionados.splice(0,)
    thisBase.efectosAdversos.splice(0,);

    thisBase.farmacoSeleccionado = {
      nombre: '',
      casa: '',
      efectosAdversos: [],
      observaciones: '',
      estado: false,
      seleccionado: false
    }

    thisBase.farmaco = {
      nombre: '',
      casa: '',
      efectosAdversos: [],
      observaciones: '',
      estado: false,
      seleccionado: false
    }

    thisBase.farmacos.forEach((f: farmaco) => {
      f.efectosAdversos.forEach(e => e.seleccionado = false)
    });
    
    console.log(thisBase.farmacos);
  }

  removerFarmaco(farmaco:farmaco, callback: (thisBase:any) => void){
    this.farmacosSeleccionados.splice(this.farmacosSeleccionados.findIndex(fs => fs._id == farmaco._id),1);
    let thisBase = this; 
    this.activarInactivarSelectFarmacos(farmaco._id, false);
    callback(thisBase);
  }

  modificarEfectosAdversos(farmaco: farmaco){      

    this.farmaco =  this.farmacos.find(f => f._id == farmaco._id) ?? farmaco;  
    this.efectosAdversosSeleccionados = [...farmaco.efectosAdversos];

    this.mostrarEfectosAdversos();    
  }

  mostrarEfectosAdversos(){    
    this.farmacoSeleccionado = {...this.farmaco}; 
    this.efectosAdversos = [...this.farmaco.efectosAdversos];

    console.log(this.efectosAdversos);
    console.log(this.farmacoSeleccionado);
  
    if(this.efectosAdversosSeleccionados.length > 0){
      this.efectosAdversos.forEach(ea => {
        if(typeof ea != "string"){
          if(this.efectosAdversosSeleccionados.findIndex(eas => eas._id == ea._id) != -1){
            ea.seleccionado = true; 
          }
        }
      })
    }
  }

  actualizarDatosClinicos(dato:datosClinicos){
 
    this.actualizacion = true;
    this.datosClinicos = this.paciente.datosClinicos;
    this.farmacosSeleccionados = [...dato.farmacosUtilizados];
    this.datoClinico = dato;

    this.farmacos.forEach(f => {
      if(this.farmacosSeleccionados.findIndex(fs => fs._id == f._id) >= 0){
        this.activarInactivarSelectFarmacos(f._id, true);
      }else{
        this.activarInactivarSelectFarmacos(f._id, false);
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
