import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { PacienteServiceService } from 'src/app/patients/services/paciente.service.service';
import { PageEvent } from '@angular/material/paginator';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalFormPacienteComponent } from '../../modals/modal-form-paciente/modal-form-paciente.component';
import { combineLatest, Subscription  } from 'rxjs';
import { DatosClinicosComponent } from '../datos-clinicos/datos-clinicos.component';
import { PacienteFichaMedicaComponent } from '../paciente-ficha-medica/paciente-ficha-medica.component';
import { datosClinicos } from '../../interfaces/datos-clinicos';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';

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
    fechaIngreso: new Date(),
    estado: false,
    observaciones: '',
    datosClinicos: [],
    fechaNacimiento: new Date()
  }; 

  modalRef: any;
  subscriptions: Subscription[] = [];

  constructor(
    private srvPaciente:  PacienteServiceService,
    private modalService: BsModalService, 
    private changeDetection: ChangeDetectorRef,
    private excelService: ExcelServiceService) {   
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
      console.log(result);
    });
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
    this.paciente = paciente;
    this.abrirFormPacientesModal();
  }

  abrirFormPacientesModal(){    
    const _combine = combineLatest(
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;
        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        this.getPacientes();
        this.clear();
        this.unsubscribe();
      })
    );   

    const initialState: ModalOptions = {
      initialState: {
        list: [
          this.paciente
        ],
        title: 'Agregar Pacientes'
      },
      class: 'modal-xl'
    };
    this.modalRef = this.modalService.show(ModalFormPacienteComponent, initialState) ;
    this.modalRef.content.closeBtnName='Close';      
  }

  abrirDatosClinicosModal(paciente: paciente){    
    const _combine = combineLatest(
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;
        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        this.getPacientes();
        this.clear();
        this.unsubscribe();
      })
    );   

    const initialState: ModalOptions = {
      initialState: {
        list: [
          paciente
        ],
        title: 'Agregar Pacientes'
      },
      class: 'modal-xl'
    };
    this.modalRef = this.modalService.show(DatosClinicosComponent, initialState) ;
    this.modalRef.content.closeBtnName='Close';      
  }

  abrirfichaPacientesModal(paciente: paciente){    
    const _combine = combineLatest(
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;
        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        this.getPacientes();
        this.unsubscribe();
        this.clear();
      })
    );   

    const initialState: ModalOptions = {
      initialState: {
        list: [
          paciente
        ],
        title: 'Agregar Pacientes'
      },
      class: 'modal-xl'
    };
    this.modalRef = this.modalService.show(PacienteFichaMedicaComponent, initialState) ;
    this.modalRef.content.closeBtnName='Close';      
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  async exportExcel(){
    const pacientes = this.pacientes.map(item => {
      return{ 
        "_id" : item._id ,
        "nombre" : item.nombre,
        "NoRegistro": item.noRegistro,
        "dpi": item.dpi,
        "sexo": item.sexo,
        "etnia": item.etnia,
        "deptoNacimiento": item.deptoNacimiento,
        "deptoResidencia": item.deptoResidencia,
        "municipioNacimiento": item.municipioNacimiento,
        "municipioResidencia": item.municipioResidencia,
        "direccion": item.direccion,
        "telefono": item.telefono,
        "nombreEncargado": item.nombreEncargado,
        "telefonoEncargado": item.telefonoEncargado,
        "fechaIngreso": item.fechaIngreso,
        "estado": item.estado ? 'Activo':'Inactivo',
        "observaciones": item.observaciones               
      }     
    })

    let datosClinicos:any[] = []; 

    this.pacientes.forEach(p => {
      p.datosClinicos.map(d => 
      {
        if(d){

          let listadoFarmacos: string[] = [];
          d.farmacosUtilizados.map((f) => {         
            listadoFarmacos.push(`${f.nombre} - ${f.casa}`);
          })

          datosClinicos.push({
            "id":p._id,
            "paciente": p.nombre,
            "diagnostico": d.diagnostico,
            "Ciclo": d.cicloNo,
            "estadio enfermedad": d.estadioEnfermedad,
            "fecha ingreso": d.fechaIngresoUnidad,
            "quimioterapia": d.quimioterapia,
            "farmacos":listadoFarmacos.join(', ')
            })
          }
        }); 
    });   

    let farmacos :any = [];
    
    this.pacientes.forEach(p=> 
    {
      p.datosClinicos.forEach(d =>{
        d.farmacosUtilizados.forEach(f => {
          farmacos.push({
            "id": p._id,
            "paciente": p.nombre,
            "ciclo": d.cicloNo,
            "farmaco": f.nombre,
            "efectos": f.efectosAdversos.join(', '),
            "efectosNoReportados" : f.efectosAdversosNoReportados.join(', ')
          })
        })
      })
    });    

    this.excelService.exportToExcel(
      pacientes, 
      datosClinicos,
      farmacos,
      `pacientes-${new Date().getTime()}`
    );
  }

  clear(){
    this.paciente = { nombre: "",
      _id : null,
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
  }
}



