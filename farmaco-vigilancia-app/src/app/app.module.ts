import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip'

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { PatientsModule } from './patients/patients.module';

@NgModule({
  declarations: [
    AppComponent, 
    AutenticacionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    PatientsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
