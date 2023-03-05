import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasaFarmaceuticaComponent } from './components/casa-farmaceutica/casa-farmaceutica.component';
import { EnfermedadComponent } from './components/enfermedad/enfermedad.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteFichaMedicaComponent } from './components/paciente-ficha-medica/paciente-ficha-medica.component';
import { FarmacoComponent } from './components/farmaco/farmaco.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalFormCasaMedicaComponent } from './components/modal-form-casa-medica/modal-form-casa-medica.component';
import { ModalFormCasaFarmaceuticaComponent } from './components/modal-form-casa-farmaceutica/modal-form-casa-farmaceutica.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ModalFormUsaurioComponent } from './components/modal-form-usaurio/modal-form-usaurio.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    CasaFarmaceuticaComponent,
    EnfermedadComponent,
    PacientesComponent,
    PacienteFichaMedicaComponent,
    FarmacoComponent,
    NavBarComponent,
    FooterComponent,
    ModalFormCasaMedicaComponent,
    ModalFormCasaFarmaceuticaComponent,
    FormPacienteComponent,
    UsuariosComponent,
    ModalFormUsaurioComponent,
    AutenticacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
