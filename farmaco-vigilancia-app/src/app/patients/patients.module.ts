import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteFichaMedicaComponent } from './pages/paciente-ficha-medica/paciente-ficha-medica.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatosClinicosComponent } from './pages/datos-clinicos/datos-clinicos.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalFormPacienteComponent } from './modals/modal-form-paciente/modal-form-paciente.component';
import { BrowserModule } from '@angular/platform-browser';
import { AlgoritmoKarchLasagnaComponent } from './pages/algoritmo-karch-lasagna/algoritmo-karch-lasagna.component';

@NgModule({
  declarations: [
    PacienteFichaMedicaComponent, 
    PacientesComponent,
    DatosClinicosComponent, 
    ModalFormPacienteComponent,
    AlgoritmoKarchLasagnaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    BrowserModule
  ]
})
export class PatientsModule { }
