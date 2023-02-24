import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { genero, estadioEnfermedad, quimioterapia, etnia } from 'src/app/constantes';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})

export class FormPacienteComponent {

  generos: string [] = [];
  estadioEnfermedad : string [] = [];
  quimioterapia: string [] = [];
  etnia: string[] = []; 
  

  constructor() {
    this.generos = genero;
    this.estadioEnfermedad = estadioEnfermedad; 
    this.quimioterapia = quimioterapia;  
    this.etnia = etnia;  
  }

  
}
