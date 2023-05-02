import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PacienteFichaMedicaComponent } from './patients/pages/paciente-ficha-medica/paciente-ficha-medica.component';
import { FormPacienteComponent } from './patients/pages/form-paciente/form-paciente.component';
import { PacientesComponent } from './patients/pages/pacientes/pacientes.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';


const routes: Routes = [
  
  {path: 'pacientes', component: PacientesComponent},
  {path: 'formulario-pacientes', component: FormPacienteComponent},
  {path: 'ficha-medica-paciente', component: PacienteFichaMedicaComponent},
  {path: 'autenticacion', component:AutenticacionComponent},
  {
    path: 'admin',
    loadChildren: ()=>import('../app/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
