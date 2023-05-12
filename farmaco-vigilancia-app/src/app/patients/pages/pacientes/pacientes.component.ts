import { Component } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { PacienteServiceService } from 'src/app/patients/services/paciente.service.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent {

  
  private pacientes: paciente[] = [];

  private paciente: paciente = {
    _id: '',
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
    datosClinicos: [],
    fehaIngreso: new Date()
  }; 

  constructor(private srvPaciente:  PacienteServiceService ) {   
  }

  getPacienteById(id:string){
    this.srvPaciente.getPaciente(id).subscribe((result)=> { this.paciente = result})
    console.log(this.paciente);
  }

  getPacientes(){
    this.srvPaciente.getPacientes.subscribe((result:any[]) =>{
      this.pacientes = result;
      console.log(this.pacientes);   
    });
  }  
  
}
