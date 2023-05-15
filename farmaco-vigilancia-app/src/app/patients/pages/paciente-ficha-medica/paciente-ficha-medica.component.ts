import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { datosClinicos } from '../../interfaces/datos-clinicos';
import { combineLatest, Subscription  } from 'rxjs';
import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';

@Component({
  selector: 'app-paciente-ficha-medica',
  templateUrl: './paciente-ficha-medica.component.html'
})

export class PacienteFichaMedicaComponent implements OnInit {

  subscriptions: Subscription[] = [];
  farmacos: farmaco[] = [];
  paciente: paciente = {
    nombre: '',
    noRegistro: '',
    dpi: '',
    sexo: '',
    etnia: '',
    deptoNacimiento: '',
    deptoResidencia: '',
    municipioNacimiento: '',
    municipioResidencia: '',
    direccion: '',
    telefono: '',
    nombreEncargado: '',
    telefonoEncargado: '',
    fechaIngreso: new Date(),
    datosClinicos: [],
    estado: false,
    observaciones: '',
    fechaNacimiento: new Date()
  }

  list: any[] = []

  constructor(
    public modalRef: BsModalRef,
    private modalService: BsModalService, 
    private changeDetection: ChangeDetectorRef)
  { 
  }

  ngOnInit(): void {
    this.paciente =this.list[0] ;
    console.log(this.paciente); 

    this.paciente.datosClinicos.forEach(d => {
      console.log(d.farmacosUtilizados);
    });

  }




}
