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
    sexo:  "",
    etnia:  "",
    deptoNacimiento:  "",
    deptoResidencia: "",
    municipioNacimiento: "",
    municipioResidencia:"",
    direccion:  "",
    telefono:  "",
    nombreEncargado: "", 
    telefonoEncargado:  "",
    diagnostico:  "",
    estadioEnfermedad:  "",
    fechaIngresoUnidad:  "",
    quimioterapia: "",
    cicloNo:  "",
    fecha: "",
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
    console.log(this.departamentos);
  }
  
  ObtenerMunicipiosDeptoNacimiento(value: any){
    this.municipiosNacimiento = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoNacimiento);
    console.log("entro", );
  }

  ObtenerMunicipiosDeptoResedencia(value:any){
    this.municipiosResidencia = this.informacionGeografica.obtenerMunicipios(this.paciente.deptoResidencia);
    console.log("entro", this.municipiosResidencia);
  }

  guardarPaciente(){
    console.log()
  }

  agregarMedicamentos(){
    console.log("agregar los medicamentos al listado");
  }

}
