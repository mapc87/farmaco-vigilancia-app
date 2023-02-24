import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasaFarmaceuticaComponent } from './components/casa-farmaceutica/casa-farmaceutica.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteFichaMedicaComponent } from './components/paciente-ficha-medica/paciente-ficha-medica.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { EnfermedadComponent } from './components/enfermedad/enfermedad.component';
import { FarmacoComponent } from './components/farmaco/farmaco.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';

const routes: Routes = [
  {path: 'farmacos', component: FarmacoComponent},
  {path: 'enfermedad', component: EnfermedadComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'formulario-pacientes', component: FormPacienteComponent},
  {path: 'ficha-medica-paciente', component: PacienteFichaMedicaComponent},
  {path: 'casas-farmaceuticas', component: CasaFarmaceuticaComponent},
  {path: 'usuarios',component:UsuariosComponent},
  {path: 'autenticacion', component:AutenticacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
