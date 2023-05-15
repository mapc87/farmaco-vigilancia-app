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
    datosClinicos: []
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
        this.unsubscribe();
      })
    );   

    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;
        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        this.getPacientes();
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
      })
    );   

    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;
        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        this.getPacientes();
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
    this.modalRef = this.modalService.show(PacienteFichaMedicaComponent, initialState) ;
    this.modalRef.content.closeBtnName='Close';      
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }


  
}


