import { Component } from '@angular/core';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { paciente } from '../../interfaces/paciente';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {

  
  private pacientes: paciente[] = [];

  private paciente: paciente = {
    id:'',
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
    diagnostico: '',
    estadioEnfermedad: '',
    fechaIngresoUnidad: '',
    quimioterapia: '',
    cicloNo: '',
    fecha: '',
    farmacosUtilizados: []
  }; 

  constructor(private srvPaciente:  PacienteServiceService ) {   
  }

  getPacienteById(id:string){
    this.srvPaciente.getPaciente(id).subscribe((result)=> { this.paciente = result})
    console.log(this.paciente);
  }

  getPacientes(){
    this.srvPaciente.getPacientes().subscribe((result:any[]) =>{
      this.pacientes = result;
      console.log(this.pacientes);   
    });
  }  
  
}
