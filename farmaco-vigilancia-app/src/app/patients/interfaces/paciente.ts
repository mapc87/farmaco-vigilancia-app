import { datosClinicos } from "./datos-clinicos";
import { KarchLassagna } from "./karchLassagna";

export interface paciente{
    _id?:any;
    nombre: string;
    noRegistro: string;
    dpi: string;
    sexo: string;
    etnia: string;
    deptoNacimiento: string;
    deptoResidencia:string;
    municipioNacimiento:string;
    municipioResidencia:string;
    direccion: string;
    telefono: string;
    nombreEncargado:string; 
    telefonoEncargado: string; 
    fechaIngreso: Date;
    fechaNacimiento: Date;
    datosClinicos : datosClinicos[];
    estado: boolean;
    observaciones: string;
    evaluacionKarchaLassagna?: KarchLassagna  
}

