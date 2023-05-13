import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteFichaMedicaComponent } from './patients/pages/paciente-ficha-medica/paciente-ficha-medica.component';
import { PacientesComponent } from './patients/pages/pacientes/pacientes.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { AlgoritmoKarchLasagnaComponent } from './patients/pages/algoritmo-karch-lasagna/algoritmo-karch-lasagna.component';


const routes: Routes = [
  
  {path: 'pacientes', component: PacientesComponent},
  {path: 'algoritmo-karch-lasagna', component: AlgoritmoKarchLasagnaComponent},
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
