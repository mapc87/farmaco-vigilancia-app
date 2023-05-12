import { Component, Input, OnInit } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { datosClinicos } from '../../interfaces/datos-clinicos';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { EnfermedadServiceService } from 'src/app/admin/services/enfermedad.service.service';
import { enfermedad } from 'src/app/admin/interfaces/enfermedad.interface';
import { estadioEnfermedad, quimioterapia } from 'src/app/constantes';

@Component({
  selector: 'app-datos-clinicos',
  templateUrl: './datos-clinicos.component.html'
})
export class DatosClinicosComponent implements OnInit  {

  @Input() paciente!: paciente 

  datoClinico : datosClinicos = {
    diagnostico: '',
    estadioEnfermedad: '',
    fechaIngresoUnidad: '',
    quimioterapia: '',
    cicloNo: '',
    fecha: '',
    farmacosUtilizados: []
  }

  enfermedades: enfermedad[] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];

  ngOnInit(): void {
    this.getEnfermedades();
    this.estadioEnfermedad = estadioEnfermedad;
    this.quimioterapia = quimioterapia;   
  }

  constructor(
    private srvPaciente : PacienteServiceService,
    private srvEnfermedad: EnfermedadServiceService
  ){
  }

  getEnfermedades(){
    this.srvEnfermedad.getEnfermedades().subscribe(result => {
      this.enfermedades = result;
      console.log(result)
    });
  }

  guardar(){
    this.srvPaciente.updatePaciente(this.paciente).subscribe(
      result => {
        console.log(result)
      }
    );
  }

  agregar(){

  }


}
