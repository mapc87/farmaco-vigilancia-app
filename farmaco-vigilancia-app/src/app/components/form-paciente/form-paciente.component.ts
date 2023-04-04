import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { genero, estadioEnfermedad, quimioterapia, etnia } from 'src/app/constantes';
import { InformacionGeograficaServiceService } from 'src/app/services/informacion-geografica.service.service';
import { paciente } from '../../interfaces/paciente';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})

export class FormPacienteComponent implements OnInit {

  generos: string [] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  etnia: string[] = []; 
  departamentos: string[] = []; 
  municipios?: string[] = [];
 

  paciente: paciente = {
    nombre: "",
    noRegistro:  "",
    dpi:  "",
    sexo:  "M",
    etnia:  "Ladino",
    deptoNacimiento:  "Guatemala",
    deptoResidencia: "Guatemala",
    municipioNacimiento: "Guatemala",
    municipioResidencia:"Guatemala",
    direccion:  "",
    telefono:  "",
    nombreEncargado: "", 
    telefonoEncargado:  "",
    diagnostico:  "",
    estadioEnfermedad:  "Estadio I",
    fechaIngresoUnidad:  "",
    quimioterapia: "Adyuvante",
    cicloNo:  "",
    fecha: "",
    farmacosUtilizados:[]
  }

  municipiosNacimiento: string[] | undefined;
  municipiosResidencia: string[] | undefined;

  constructor(private informacionGeografica: InformacionGeograficaServiceService) {

    this.generos = genero;
    this.estadioEnfermedad = estadioEnfermedad; 
    this.quimioterapia = quimioterapia;  
    this.etnia = etnia; 
  }

  ngOnInit(): void {
    this.departamentos = this.informacionGeografica.obtenerDepartamentos();
    this.ObtenerMunicipiosDeptoNacimiento(this.paciente.deptoNacimiento);
    this.ObtenerMunicipiosDeptoResedencia(this.paciente.deptoResidencia);
  }
  
  ObtenerMunicipiosDeptoNacimiento(value: any){
    this.municipiosNacimiento = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoNacimiento);
    this.paciente.municipioNacimiento = this.municipiosNacimiento != undefined ? this.municipiosNacimiento[0]:"";
  }

  ObtenerMunicipiosDeptoResedencia(value:any){
    console.log(value);
    this.municipiosResidencia = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoResidencia);
    this.paciente.municipioResidencia = this.municipiosResidencia != undefined ? this.municipiosResidencia[0]:"";
  }

  guardarPaciente(){
    console.log(this.paciente);
  }

  agregarMedicamentos(){
    console.log("agregar los medicamentos al listado");
  }

}
