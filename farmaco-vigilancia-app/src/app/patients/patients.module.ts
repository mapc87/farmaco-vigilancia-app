import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormPacienteComponent } from './pages/form-paciente/form-paciente.component';
import { PacienteFichaMedicaComponent } from './pages/paciente-ficha-medica/paciente-ficha-medica.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalFarmacosComponent } from './modals/modal-farmacos/modal-farmacos.component';
import { DatosClinicosComponent } from './pages/datos-clinicos/datos-clinicos.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { ModalFormPacienteComponent } from './modals/modal-form-paciente/modal-form-paciente.component';

@NgModule({
  declarations: [
    FormPacienteComponent, 
    PacienteFichaMedicaComponent, 
    PacientesComponent, 
    ModalFarmacosComponent, 
    DatosClinicosComponent, ModalFormPacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ToastrModule.forRoot() 
  ]
})
export class PatientsModule { }
