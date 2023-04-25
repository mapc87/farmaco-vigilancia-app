import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { MatPaginatorModule} from '@angular/material/paginator';

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
import { ModalFormUsuarioComponent } from './components/modal-form-usuario/modal-form-usuario.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule} from '@angular/common/http';
import { ModalFormEnfermedadComponent } from './components/modal-form-enfermedad/modal-form-enfermedad.component';
import { FormModalFarmacoComponent } from './components/form-modal-farmaco/form-modal-farmaco.component';
import { EfectosAdversosComponent } from './components/efectos-adversos/efectos-adversos.component';
import { AlgoritmoKarchLasagnaComponent } from './components/algoritmo-karch-lasagna/algoritmo-karch-lasagna.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ModalFormUsuarioComponent,
    AutenticacionComponent,
    ModalFormEnfermedadComponent,
    FormModalFarmacoComponent,
    EfectosAdversosComponent,
    AlgoritmoKarchLasagnaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
