import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasaFarmaceuticaComponent } from './pages/casa-farmaceutica/casa-farmaceutica.component';
import { FormsModule } from '@angular/forms';
import { EnfermedadComponent } from './pages/enfermedad/enfermedad.component';
import { FarmacoComponent } from './pages/farmaco/farmaco.component';
import { EfectosAdversosComponent } from './pages/efectos-adversos/efectos-adversos.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalEfectosComponent } from './modals/form-modal-farmaco/form-modal-efectos.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    CasaFarmaceuticaComponent,
    EnfermedadComponent,
    EfectosAdversosComponent,
    FarmacoComponent,
    UsuariosComponent,
    ModalEfectosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    AdminRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot()
  ], 
  exports: [    
  ]
})
export class AdminModule { }
