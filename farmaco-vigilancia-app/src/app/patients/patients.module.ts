import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormPacienteComponent } from './pages/form-paciente/form-paciente.component';
import { PacienteFichaMedicaComponent } from './pages/paciente-ficha-medica/paciente-ficha-medica.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalFarmacosComponent } from './modals/modal-farmacos/modal-farmacos.component';


@NgModule({
  declarations: [
    FormPacienteComponent, 
    PacienteFichaMedicaComponent, 
    PacientesComponent, ModalFarmacosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule    
  ]
})
export class PatientsModule { }
