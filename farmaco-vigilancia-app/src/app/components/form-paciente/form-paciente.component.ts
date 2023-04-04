import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { genero, estadioEnfermedad, quimioterapia, etnia } from 'src/app/constantes';
import { InformacionGeograficaServiceService } from 'src/app/services/informacion-geografica.service.service';
import { paciente } from '../../interfaces/paciente';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { FarmacoServiceService } from 'src/app/services/farmaco.service.service';
import { farmaco } from 'src/app/interfaces/farmaco.interface';


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
 
  private farmacos: farmaco[] = []

  paciente: paciente = {
    id: "",
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

  constructor(
    private informacionGeografica: InformacionGeograficaServiceService, 
    private srvPaciente: PacienteServiceService,
    private srvFarmaco: FarmacoServiceService) {

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

  getFarmacos(){
    this.srvFarmaco.getFarmacos().subscribe((result)=>{
      this.farmacos = result; 
      console.log(this.farmacos);
    })
  }

  getPaciente(id:string){
    this.srvPaciente.getPaciente(id).subscribe((result)=> { this.paciente = result})
    console.log(this.paciente);
  }

  addPaciente(){
    this.srvPaciente.addPaciente(this.paciente).subscribe(result => {
      console.log(result);
    })
  }

  updatePaciente(){
    this.srvPaciente.updatePaciente(this.paciente).subscribe(result => {
      console.log(result);
    })
  }

  agregarMedicamentos(){
    console.log("agregar los medicamentos al listado");
  }
}
